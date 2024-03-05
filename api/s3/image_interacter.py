from fastapi import APIRouter
from s3.aws_handler import get_presigned_url

router = APIRouter()

# @router.get("/gpt/get_url")
def get_url():
    # [Sample] Get Image from GPT
    # [Sample] Save Image to S3
    # [Code] Get Pre Signed URL from S3
    presigend_url = get_presigned_url("car.png")
    return {"presigend_url": presigend_url}
