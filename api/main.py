import os
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from s3 import image_interacter
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
