from fastapi import APIRouter, Query
from typing import Optional, List
from app.utils.mock_data import generate_mock_voters, generate_mock_leaders, generate_heatmap_data

router = APIRouter()

@router.get("/voters")
async def get_voters(
    intention_min: int = Query(0, ge=0, le=100),
    intention_max: int = Query(100, ge=0, le=100),
    status: Optional[List[str]] = Query(None),
    bbox: Optional[str] = None
):
    """
    Get voters as GeoJSON FeatureCollection.
    """
    # In a real implementation, we would filter by bbox and other params in the DB.
    # For now, we just return mock data.
    data = generate_mock_voters(count=500)
    
    # Simple in-memory filtering for mock data
    if status:
        data["features"] = [
            f for f in data["features"] 
            if f["properties"]["status"] in status
        ]
        
    data["features"] = [
        f for f in data["features"]
        if intention_min <= f["properties"]["intention"] <= intention_max
    ]
    
    return data

@router.get("/leaders")
async def get_leaders():
    """
    Get leaders as GeoJSON FeatureCollection.
    """
    return generate_mock_leaders(count=20)

@router.get("/heatmap")
async def get_heatmap(metric: str = "intention"):
    """
    Get heatmap data as GeoJSON FeatureCollection.
    """
    return generate_heatmap_data()
