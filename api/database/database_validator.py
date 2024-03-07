import sqlite3 
from sqlite3 import Connection
import os
from fastapi import  HTTPException,status


def connect_database(path) -> Connection:
    """
        データベースが存在するかどうかをチェック
        Args:
            path (str): データベースのパス

        Returns:

            conn (Connection): SQLiteConnection オブジェクト

        Raises:
            HTTP_404_NOT_Found: 指定したデータベースが存在しない or 指定されたidのデータがデータベースに存在しない

    """
    if not os.path.isfile(path):
        # データベースが存在しない
        raise HTTPException(
                status_code=status.HTTP_404_NOT_Found,
                detail="The specified database does not exist.",
            )
    else:
        # データベースが存在する場合、接続を開く
        conn = sqlite3.connect(path)
        return conn

def check_effectiveness(check_list:list) -> None:

    """
        データベースのリクエストをチェック
        Args:
            text (list): リクエストの内容

        Raises:
            HTTP_400_BAD_REQUEST: 不正な入力

    """

    print(check_list)
    try:
        for text in check_list:
            assert str(text).isidentifier()
    except:
        print("text:"+str(text))
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Illegal input",
            )
