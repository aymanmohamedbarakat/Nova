from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from .database import get_db
from .models import Product, User, Wishlist, Newsletter, Order
import shutil
import os
from pathlib import Path
from datetime import datetime, timedelta
import secrets
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

# JWT Configuration
SECRET_KEY = "YOUR_SECRET_KEY_HERE"  # Change this to a secure random string in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Setup OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

UPLOAD_DIR = Path("static/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
router = APIRouter()

# --- Pydantic Models ---

class ProductBase(BaseModel):
    title: str
    price: float
    discount_price: float
    category: str
    description: str = None
    image1: str = None
    image2: str = None

class ProductResponse(ProductBase):
    id: int
    
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[int] = None

class WishlistCreate(BaseModel):
    product_id: int

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    price: float

class OrderCreate(BaseModel):
    items: List[OrderItemBase]
    shipping_address: str

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    shipping_address: str
    created_at: datetime
    items: List[dict]
    
    class Config:
        orm_mode = True

class NewsletterCreate(BaseModel):
    title: str
    content: str
    image: str = None

class NewsletterResponse(BaseModel):
    id: int
    title: str
    content: str
    image: str = None
    
    class Config:
        orm_mode = True

# --- Helper Functions ---

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        if username is None or user_id is None:
            raise credentials_exception
        token_data = TokenData(username=username, user_id=user_id)
    except jwt.PyJWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == token_data.user_id).first()
    if user is None:
        raise credentials_exception
    return user

# --- API Routes ---

@router.get("/products", response_model=List[ProductResponse], tags=["products"])
def get_products(category: str = None, db: Session = Depends(get_db)):
    """
    Get all products or filter by category
    """
    if category and category != "category":  # Only filter if category is provided and not "category"
        return db.query(Product).filter(Product.category == category).all()
    return db.query(Product).all()

@router.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    try:
        product_id = int(product_id)
    except ValueError:
        raise HTTPException(status_code=422, detail="Product ID must be an integer")
    
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/products", response_model=ProductResponse, tags=["products"])
def create_product(product: ProductBase, db: Session = Depends(get_db)):
    """
    Create a new product
    """
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.post("/register", response_model=Token, tags=["auth"])
def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user and return access token
    """
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # In production, you should hash the password
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": new_user.username, "user_id": new_user.id},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token, tags=["auth"])
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """
    Login user and return access token
    """
    user = db.query(User).filter(
        User.username == user_data.username,
        User.password == user_data.password  # In production, verify hashed password
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "user_id": user.id},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/verify-token", response_model=UserResponse, tags=["auth"])
def verify_token(current_user: User = Depends(get_current_user)):
    """
    Verify token and return user info
    """
    return current_user

@router.post("/wishlist", tags=["wishlist"])
def add_to_wishlist(
    wishlist_item: WishlistCreate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Add product to user's wishlist (requires authentication)
    """
    product = db.query(Product).filter(Product.id == wishlist_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    existing_item = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.product_id == wishlist_item.product_id
    ).first()
    
    if existing_item:
        raise HTTPException(status_code=400, detail="Product already in wishlist")
    
    new_wishlist_item = Wishlist(user_id=current_user.id, product_id=wishlist_item.product_id)
    db.add(new_wishlist_item)
    db.commit()
    
    return {"message": "Added to wishlist"}

@router.delete("/wishlist/{product_id}", tags=["wishlist"])
def remove_from_wishlist(
    product_id: int, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Remove product from user's wishlist (requires authentication)
    """
    wishlist_item = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.product_id == product_id
    ).first()
    
    if not wishlist_item:
        raise HTTPException(status_code=404, detail="Item not in wishlist")
   
    db.delete(wishlist_item)
    db.commit()
    
    return {"message": "Removed from wishlist"}

@router.get("/wishlist", response_model=List[ProductResponse], tags=["wishlist"])
def get_wishlist(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get user's wishlist products (requires authentication)
    """
    products = db.query(Product).join(
        Wishlist, Wishlist.product_id == Product.id
    ).filter(Wishlist.user_id == current_user.id).all()
    
    return products

@router.post("/orders", response_model=OrderResponse, tags=["orders"])
def create_order(
    order: OrderCreate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new order (requires authentication)
    """
    # Calculate total amount
    total_amount = 0
    order_items = []
    
    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} not found")
        
        # Use the actual product price from the database
        price = product.discount_price if product.discount_price else product.price
        item_total = price * item.quantity
        total_amount += item_total
        
        order_items.append({
            "product_id": item.product_id,
            "title": product.title,
            "quantity": item.quantity,
            "price": price,
            "item_total": item_total
        })
    
    # Create order
    new_order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        shipping_address=order.shipping_address,
        status="pending",
        items=order_items
    )
    
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    
    return new_order

@router.get("/orders", response_model=List[OrderResponse], tags=["orders"])
def get_orders(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get user's orders (requires authentication)
    """
    orders = db.query(Order).filter(Order.user_id == current_user.id).all()
    return orders

@router.get("/orders/{order_id}", response_model=OrderResponse, tags=["orders"])
def get_order_details(
    order_id: int, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get details of a specific order (requires authentication)
    """
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.user_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return order

@router.post("/upload-image", tags=["utils"])
async def upload_image(file: UploadFile = File(...)):
    """
    Upload an image and return the URL path
    """
    # Validate file is an image
    content_type = file.content_type
    if not content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Create a unique filename using a random token
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{secrets.token_hex(8)}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save the file
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return the URL path that can be stored in the database
    file_url = f"/static/uploads/{unique_filename}"
    
    return {"filename": unique_filename, "url": file_url}