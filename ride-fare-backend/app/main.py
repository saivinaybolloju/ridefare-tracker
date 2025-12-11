from fastapi import FastAPI
from app.routes import uber,ola

app = FastAPI(
    title="RideFare Backend API",
    description="FastAPI backend for Ride Fare Comparison & Surge Prediction",
    version="1.0"
)

app.include_router(uber.router, prefix="/api/uber")
app.include_router(ola.router, prefix="/api/ola")

@app.get("/")
def root():
    return {"message": "🚀 RideFare FastAPI Backend is running"}
