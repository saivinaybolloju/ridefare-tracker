from motor.motor_asyncio import AsyncIOMotorClient
from decouple import config

# Load MongoDB URI from .env
MONGO_URI = config("MONGO_URI")

# Mongo Client
client = AsyncIOMotorClient(MONGO_URI)

# Database name 
db = client["ridefare"]

# Collection where history will be saved
fare_history = db["fare_history"]
