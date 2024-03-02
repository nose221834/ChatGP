import boto3
from dotenv import load_dotenv
import os

load_dotenv('.env')

# 環境変数を取得
BUCKET_NAME = os.getenv('BUCKET')
#bucket_name="hackason-s3"

client = boto3.client(
    's3',
)

def get_presigned_url(key:str):
    return client.generate_presigned_url(
        ClientMethod = 'get_object',
        Params = {'Bucket' : BUCKET_NAME, 'Key' : key},
        ExpiresIn = 600,
        HttpMethod = 'GET')
