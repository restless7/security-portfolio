from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.v1 import operations, geo

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(geo.router, prefix=f"{settings.API_V1_STR}/operations/geo", tags=["geo"])
# app.include_router(operations.router, prefix=f"{settings.API_V1_STR}/operations", tags=["operations"])

@app.get("/")
def root():
    return {"message": "Welcome to Centro Electoral API"}
