import os
from dotenv import load_dotenv

load_dotenv()

import requests
import json

GOOGLE_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
print("GOOGLE API KEY:", os.getenv("GOOGLE_MAPS_API_KEY"))
def get_uber_estimate(start_lat, start_lng, end_lat, end_lng):
    try:
        url = "https://routes.googleapis.com/directions/v2:computeRoutes"

        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_API_KEY,
            "X-Goog-FieldMask": "routes.distanceMeters,routes.duration"
        }

        body = {
            "origin": {
                "location": {
                    "latLng": {
                        "latitude": start_lat,
                        "longitude": start_lng
                    }
                }
            },
            "destination": {
                "location": {
                    "latLng": {
                        "latitude": end_lat,
                        "longitude": end_lng
                    }
                }
            },
            "travelMode": "DRIVE"
        }

        response = requests.post(url, headers=headers, data=json.dumps(body))
        data = response.json()

        if "routes" not in data:
            return {
                "error": "Google Routes API failed",
                "details": data
            }

        route = data["routes"][0]

        distance_km = route["distanceMeters"] / 1000
        duration_sec = int(route["duration"].replace("s", ""))
        duration_min = duration_sec / 60

        # ✅ REALISTIC WEIGHTED PRICING
        BASE_FARE = 50
        PER_KM_RATE = 12
        PER_MIN_RATE = 2

        estimated_price = (
            BASE_FARE +
            (distance_km * PER_KM_RATE) +
            (duration_min * PER_MIN_RATE)
        )

        surge_multiplier = 1.0  # ML later
        final_price = round(estimated_price * surge_multiplier, 2)

        return {
            "provider": "Uber (Live Google Routes)",
            "distance_km": round(distance_km, 2),
            "duration_min": round(duration_min, 2),
            "estimated_price": final_price
        }

    except Exception as e:
        return {
            "error": "Backend crash in Uber Service",
            "details": str(e)
        }
