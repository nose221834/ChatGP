import os
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from s3 import image_interacter
from routes import race_routes , ending_routes ,database_routes,car_generation_routes
from api_test import test_car_data,test_translation, no_rembg

app = FastAPI()

EXECUTING_ENVIRONMENT= os.getenv('EXECUTING_ENVIRONMENT')

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


if EXECUTING_ENVIRONMENT=="prod":

    # ChatGPTで車を生成するAPIのルーター
    app.include_router(car_generation_routes.router)

    # データベースを操作するAPIのルーター
    app.include_router(database_routes.router)

    # レースの進行を行うAPIのルーター
    app.include_router(race_routes.router)

    # エンディングを生成するAPIのルーター
    app.include_router(ending_routes.router)

elif EXECUTING_ENVIRONMENT=="dev":
    # s3を使用したAPIのルーター
    # app.include_router(image_interacter.router)

    # ChatGPTで車を生成するAPIのルーター
    app.include_router(test_car_data.router) 

    # データベースを操作するAPIのルーター
    app.include_router(database_routes.router)

    # レースの進行を行うAPIのルーター
    app.include_router(race_routes.router)

    # エンディングを生成するAPIのルーター
    app.include_router(ending_routes.router)

    # 翻訳APIのルーター
    app.include_router(test_translation.router)
    
else:
    pass 

