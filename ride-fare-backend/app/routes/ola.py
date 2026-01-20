from fastapi import APIRouter
from datetime import datetime
from app.services.google_routes import get_distance_duration
from app.utils.pricing import ola_price
from app.database.mongo import fare_history

router = APIRouter()

@router.get("/estimate")
async def ola_estimate(
    userId: str,
    start_lat: float,
    start_lng: float,
    end_lat: float,
    end_lng: float,
    ride_type: str = "mini"  # mini, auto, bike
):
    result = get_distance_duration(start_lat, start_lng, end_lat, end_lng)

    if result.get("error"):
        return result

    distance = result["distance_km"]
    duration = result["duration_min"]

    price = ola_price(distance, duration, ride_type)

    await fare_history.insert_one({
        "userId": userId,
        "provider": f"Ola ({ride_type})",
        "from": f"{start_lat},{start_lng}",
        "to": f"{end_lat},{end_lng}",
        "distance_km": distance,
        "duration_min": duration,
        "fare": price,
        "checkedAt": datetime.utcnow()
    })

    return {
        "provider": f"Ola ({ride_type})",
        "distance_km": distance,
        "duration_min": duration,
        "estimated_price": price
    }
