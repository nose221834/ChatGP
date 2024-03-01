import boto3

BUCKET = "hackason-s3"

client = boto3.client(
    's3',
)
def get_presigned_url(key):
    return client.generate_presigned_url(
        ClientMethod = 'get_object',
        Params = {'Bucket' : BUCKET, 'Key' : key},
        ExpiresIn = 600,
        HttpMethod = 'GET')
