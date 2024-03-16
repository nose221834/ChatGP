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

    # データベースが存在する場合は接続を開き,存在しない場合は404エラーが発生
    if not os.path.isfile(path):
        raise HTTPException(
                status_code=status.HTTP_404_NOT_Found,
                detail="The specified database does not exist.",
            )
    else:
        conn = sqlite3.connect(path)
        return conn

def check_input_query(check_list:list) -> None:
    """
        データベースのクエリに使用する変数をチェック
        Args:
            text (list): クエリに使用する変数が格納されたリスト

        Return:
            None

        Raises:
            HTTP_400_BAD_REQUEST: 不正な入力

    """

    print("input query"+str(check_list))
    
    # クエリに使用する変数の内容が,"アルファベット,アンダースコアで始まり,任意の数のアルファベット、数字、アンダースコアが続く文字列"であることを確認
    # クエリの内容に問題がみられた場合400エラーが発生
    try:
        for text in check_list:
            assert str(text).isidentifier()
    except:
        print("error text:"+str(text))
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Illegal input",
            )
