import os
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from s3 import image_interacter
from routes import race_routes , ending_routes ,database_routes,car_generation_routes
from api_test import test_car_data,test_translation, no_rembg,test_database

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


"""
注意！！！本番以外はコメントアウト
本番は下記の
app.include_router(api_test.router)
を使用してください.
"""
# s3を使用したAPIのルーター
# app.include_router(image_interacter.router)

# ChatGPTで車を生成するAPIのルーター
# app.include_router(car_generation_routes.router)

# car_generation_routesでrembgを使用していないver
# app.include_router(no_rembg.router)

# データベースを操作するAPIのルーター
app.include_router(database_routes.router)

# レースの進行を行うAPIのルーター
app.include_router(race_routes.router)

# エンディングを生成するAPIのルーター
app.include_router(ending_routes.router)



"""
注意！！！本番以外はこっちを使用
上記のAPIはコメントアウトしてください.
"""
# car_generation_routesの代わりに使用
app.include_router(test_car_data.router) 

# 翻訳APIのルーター
app.include_router(test_translation.router)

# データベースのクエリ確認用
app.include_router(test_database.router)
