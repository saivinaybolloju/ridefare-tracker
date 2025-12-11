from fastapi import APIRouter
from app.services.google_routes import get_distance_duration
from app.utils.pricing import ola_price

router = APIRouter()

@router.get("/estimate")
def ola_estimate(
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

    return {
        "provider": f"Ola ({ride_type})",
        "distance_km": distance,
        "duration_min": duration,
        "estimated_price": price
    }
