from fastapi import APIRouter
from app.services.google_routes import get_distance_duration
from app.services.rapido_service import (
    calculate_rapido_bike_fare,
    calculate_rapido_auto_fare
)

router = APIRouter()

@router.get("/estimate")
def rapido_estimate(
    start_lat: float,
    start_lng: float,
    end_lat: float,
    end_lng: float
):
    data = get_distance_duration(start_lat, start_lng, end_lat, end_lng)
    distance = data["distance_km"]
    duration = data["duration_min"]

    bike_price = calculate_rapido_bike_fare(distance, duration)
    auto_price = calculate_rapido_auto_fare(distance, duration)

    return {
        "provider": "Rapido",
        "distance_km": distance,
        "duration_min": duration,
        "bike_fare": bike_price,
        "auto_fare": auto_price
    }
