import requests
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def get_distance_duration(start_lat, start_lng, end_lat, end_lng):
    if not GOOGLE_MAPS_API_KEY:
        return {"error": "Google Routes API Key missing"}

    url = "https://routes.googleapis.com/directions/v2:computeRoutes"

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration"
    }

    payload = {
        "origin": {"location": {"latLng": {"latitude": start_lat, "longitude": start_lng}}},
        "destination": {"location": {"latLng": {"latitude": end_lat, "longitude": end_lng}}},
        "travelMode": "DRIVE"
    }

    response = requests.post(url, json=payload, headers=headers)
    data = response.json()

    if "routes" not in data:
        return {"error": "Google Routes API failed", "details": data}

    distance_km = data["routes"][0]["distanceMeters"] / 1000
    duration_sec = int(data["routes"][0]["duration"].replace("s", ""))
    duration_min = duration_sec / 60

    return {
        "distance_km": round(distance_km, 2),
        "duration_min": round(duration_min, 2)
    }
