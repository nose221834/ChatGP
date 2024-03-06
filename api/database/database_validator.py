import sqlite3
import os
from fastapi import  HTTPException,status


def connect_database(path):
    # データベースが既に存在するかどうかをチェック
    if not os.path.isfile(path):
        # データベースが存在しない
        raise HTTPException(
                status_code=status.HTTP_404_NOT_Found,
                detail="ChatGPT output does not follow the format",
            )
    else:
        # データベースが存在する場合、接続を開く
        conn = sqlite3.connect(path)
        return conn