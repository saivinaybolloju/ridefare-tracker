from fastapi import APIRouter
from app.services.uber_service import get_uber_estimate

router = APIRouter()

@router.get("/estimate")
def uber_estimate(
    start_lat: float,
    start_lng: float,
    end_lat: float,
    end_lng: float
):
    return get_uber_estimate(start_lat, start_lng, end_lat, end_lng)
