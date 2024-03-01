import os
from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
