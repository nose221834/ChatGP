import os
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from s3 import image_interacter
from chat_gpt import car_data
from api_test import test_car_data,test_translation
import  api_routes

app = FastAPI()

origins = [
     os.getenv("ACSESS_ALLOW_URL"),  # Next.jsアプリケーションのオリジン
    # 必要に応じて他のオリジンも追加
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 許可するオリジンのリスト
    allow_credentials=True,
    allow_methods=["*"],  # すべてのメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)

app.include_router(image_interacter.router)
app.include_router(api_routes.router)


"""
注意！！！本番以外はコメントアウト
下記の
app.include_router(api_test.router)
を使用してください.
"""
#ChatGPTで車の情報を生成
#app.include_router(car_data.router)


"""
注意！！！本番以外はこっちを使用
上記のAPIはコメントアウトしてください.
"""
#APiの料金を抑えるためのtestAPI
app.include_router(test_car_data.router)
app.include_router(test_translation.router)

