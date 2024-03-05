import os
from fastapi import Security, HTTPException,status
from fastapi.security import APIKeyHeader

api_access_id = os.getenv("API_ACCESS_ID")
api_key_header = APIKeyHeader(name=api_access_id)

def validate_api_key(api_key_header: str = Security(api_key_header)) -> str:
    api_access_key = os.getenv("API_ACCESS_KEY")
    if api_key_header == api_access_key:
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing API Key",
    )
