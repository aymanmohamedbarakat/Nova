from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .routes import router

# Create tables in database
models.Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(title="Nova Shop API")

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