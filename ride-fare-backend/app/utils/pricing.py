def ola_price(distance_km: float, duration_min: float, ride_type: str):
    """
    Ola pricing based on official fare charts (India).
    """
    
    ride_type = ride_type.lower()

    if ride_type == "mini":
        base_fare = 50
        per_km = 10
        per_min = 1.5

    elif ride_type == "auto":
        base_fare = 30
        per_km = 8
        per_min = 1.0

    elif ride_type == "bike":
        base_fare = 20
        per_km = 6
        per_min = 1.0

    else:
        return {"error": "Invalid ride type. Use: mini, auto, bike"}

    price = base_fare + (distance_km * per_km) + (duration_min * per_min)
    return round(price, 2)
