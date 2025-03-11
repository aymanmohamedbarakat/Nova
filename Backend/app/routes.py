from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel
from .database import get_db
from .models import Product, User, Wishlist, Newsletter

router = APIRouter()


class ProductBase(BaseModel):
    title: str
    price: float
    discount_price: float
    category: str
    description: str = None
    image: str = None

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

class WishlistCreate(BaseModel):
    product_id: int

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


@router.get("/products", response_model=List[ProductResponse], tags=["products"])
def get_products(category: str = None, db: Session = Depends(get_db)):
    """
    Get all products or filter by category
    """
    if category:
        return db.query(Product).filter(Product.category == category).all()
    return db.query(Product).all()

@router.get("/products/{product_id}", response_model=ProductResponse, tags=["products"])
def get_product(product_id: int, db: Session = Depends(get_db)):
    """
    Get a specific product by ID
    """
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

@router.post("/register", response_model=UserResponse, tags=["auth"])
def register(user: UserCreate, db: Session = Depends(get_db)):
 
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", tags=["auth"])
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.username == user_data.username,
        User.password == user_data.password
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    return {"id": user.id, "username": user.username, "message": "Login successful"}

@router.post("/wishlist", tags=["wishlist"])
def add_to_wishlist(wishlist_item: WishlistCreate, user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    product = db.query(Product).filter(Product.id == wishlist_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    existing_item = db.query(Wishlist).filter(
        Wishlist.user_id == user_id,
        Wishlist.product_id == wishlist_item.product_id
    ).first()
    
    if existing_item:
        raise HTTPException(status_code=400, detail="Product already in wishlist")
    
    new_wishlist_item = Wishlist(user_id=user_id, product_id=wishlist_item.product_id)
    db.add(new_wishlist_item)
    db.commit()
    
    return {"message": "Added to wishlist"}

@router.delete("/wishlist/{user_id}/{product_id}", tags=["wishlist"])
def remove_from_wishlist(user_id: int, product_id: int, db: Session = Depends(get_db)):

   
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
   
    wishlist_item = db.query(Wishlist).filter(
        Wishlist.user_id == user_id,
        Wishlist.product_id == product_id
    ).first()
    
    if not wishlist_item:
        raise HTTPException(status_code=404, detail="Item not in wishlist")
   
    db.delete(wishlist_item)
    db.commit()
    
    return {"message": "Removed from wishlist"}

@router.get("/wishlist/{user_id}", response_model=List[ProductResponse], tags=["wishlist"])
def get_wishlist(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    products = db.query(Product).join(
        Wishlist, Wishlist.product_id == Product.id
    ).filter(Wishlist.user_id == user_id).all()
    
    return products

@router.post("/newsletter", response_model=NewsletterResponse, tags=["newsletter"])
def create_newsletter(newsletter: NewsletterCreate, db: Session = Depends(get_db)):
    db_newsletter = Newsletter(**newsletter.dict())
    db.add(db_newsletter)
    db.commit()
    db.refresh(db_newsletter)
    return db_newsletter

@router.get("/newsletter", response_model=List[NewsletterResponse], tags=["newsletter"])
def get_newsletters(db: Session = Depends(get_db)):
    return db.query(Newsletter).all()