from fastapi import FastAPI
from app.routes import uber,ola,rapido,history
from app.database.mongo import fare_history

app = FastAPI(
    title="RideFare Backend API",
    description="FastAPI backend for Ride Fare Comparison & Surge Prediction",
    version="1.0"
)

app.include_router(uber.router, prefix="/api/uber")
app.include_router(ola.router, prefix="/api/ola")
app.include_router(rapido.router, prefix="/api/rapido")
app.include_router(history.router, prefix="/api/history")

@app.get("/")
def root():
    return {"message": "🚀 RideFare FastAPI Backend is running"}
@app.get("/test-db")
async def test_db():
    doc = {"status": "MongoDB working", "ok": True}
    await fare_history.insert_one(doc)
    return {"message": "Inserted test document"}