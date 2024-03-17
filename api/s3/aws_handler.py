import boto3
import os


# 環境変数を取得
BUCKET_NAME = os.getenv('BUCKET')
#bucket_name="hackason-s3"

# クライアント(S3のAPIサービス呼び出しに使用)の作成
client = boto3.client(
    's3',
)

def get_presigned_url(key:str):
    """
        S3内のオブジェクトを取得できるURLを生成

        Args:
            key (str): URLを生成したいS3オブジェクトのパス
            
        Returns: 
            client.generate_presigned_url (str): オブジェクトが取得できる
    """
    # 事前署名済みURLを生成
    return client.generate_presigned_url(
        ClientMethod = 'get_object', # URLの役割を"オブジェクトの取得"に設定
        Params = {'Bucket' : BUCKET_NAME, 'Key' : key},
        ExpiresIn = 600, # URLの有効期限(600秒)
        HttpMethod = 'GET' # URLを使用したリクエストのHTTPメソッドをGETに指定
        )
