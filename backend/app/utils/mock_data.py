import random
import math
from typing import List, Dict, Any

# Bucaramanga Center
CENTER_LAT = 7.1193
CENTER_LNG = -73.1227

def generate_random_coordinates(center_lat: float, center_lng: float, radius_km: float = 5.0):
    """Generate random coordinates within a radius of a center point."""
    radius_deg = radius_km / 111.0
    u = random.random()
    v = random.random()
    w = radius_deg * math.sqrt(u)
    t = 2 * math.pi * v
    x = w * math.cos(t)
    y = w * math.sin(t)
    
    # Adjust for longitude shrinking
    x = x / math.cos(math.radians(center_lat))
    
    return {
        "lat": center_lat + y,
        "lng": center_lng + x
    }

def generate_mock_voters(count: int = 500) -> Dict[str, Any]:
    """Generate a GeoJSON FeatureCollection of mock voters."""
    features = []
    
    statuses = ['confirmed', 'pending', 'opposition', 'unknown']
    weights = [0.45, 0.35, 0.15, 0.05]  # Probabilities
    
    for i in range(count):
        coords = generate_random_coordinates(CENTER_LAT, CENTER_LNG, radius_km=4.0)
        status = random.choices(statuses, weights=weights)[0]
        intention = random.randint(0, 100)
        
        # Correlate status with intention
        if status == 'confirmed':
            intention = random.randint(80, 100)
        elif status == 'opposition':
            intention = random.randint(0, 30)
        elif status == 'pending':
            intention = random.randint(30, 80)
            
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [coords["lng"], coords["lat"]]
            },
            "properties": {
                "id": f"voter_{i}",
                "name": f"Voter {i}",
                "status": status,
                "intention": intention,
                "address": f"Calle {random.randint(1, 100)} #{random.randint(1, 100)}-{random.randint(1, 100)}"
            }
        }
        features.append(feature)
        
    return {
        "type": "FeatureCollection",
        "features": features
    }

def generate_mock_leaders(count: int = 20) -> Dict[str, Any]:
    """Generate a GeoJSON FeatureCollection of mock leaders."""
    features = []
    
    for i in range(count):
        coords = generate_random_coordinates(CENTER_LAT, CENTER_LNG, radius_km=3.5)
        
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [coords["lng"], coords["lat"]]
            },
            "properties": {
                "id": f"leader_{i}",
                "name": f"Leader {i}",
                "role": "Coordinator",
                "voters_count": random.randint(50, 200),
                "performance": random.randint(60, 100)
            }
        }
        features.append(feature)
        
    return {
        "type": "FeatureCollection",
        "features": features
    }

def generate_heatmap_data() -> Dict[str, Any]:
    """Generate heatmap data (same as voters but optimized for heatmap)."""
    return generate_mock_voters(count=1000)
