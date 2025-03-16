# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.database import engine #from .database import engine
# import app.models as models  # بلبل
# from app.routes import router #from .routes import router
# from fastapi.staticfiles import StaticFiles # بلبل
# import os # بلبل

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine  # Changed from relative import
import app.models as models      # Changed from relative import 
from app.routes import router    # Changed from relative import
from fastapi.staticfiles import StaticFiles
import os

# Create tables in database
models.Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(title="Nova Shop API")

# Add this after creating the app
app.mount("/static", StaticFiles(directory="static"), name="static") # بلبل

# Setup CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)

# Home route
@app.get("/")
def read_root():
    return {"message": "Welcome to Nova Shop API"}