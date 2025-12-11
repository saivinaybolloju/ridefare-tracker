def calculate_rapido_bike_fare(distance_km: float, duration_min: float):
    base = 20
    per_km = 5
    per_min = 1.5
    platform_fee = 10

    cost = base + (per_km * distance_km) + (per_min * duration_min) + platform_fee
    gst = cost * 0.05
    return round(cost + gst, 2)


def calculate_rapido_auto_fare(distance_km: float, duration_min: float):
    base = 30
    per_km = 13
    per_min = 1.5
    platform_fee = 10

    cost = base + (per_km * distance_km) + (per_min * duration_min) + platform_fee
    gst = cost * 0.05
    return round(cost + gst, 2)
