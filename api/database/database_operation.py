import sqlite3
from validator.database_validator import connect_database,validate_input_query
from fastapi import  HTTPException,status

def add_data_from_db(db:str,command:str):
    """
        データベースにデータを追加する

        Args:
            db (str): データベースのパス
            command (str): データベースのクエリ
            
        Returns:  
    """

    # データベースに接続
    conn = connect_database(db)
    c = conn.cursor()
    
    # データベースに対してクエリを実行
    c.execute(command)

    # クエリによって実行された変更をデータベースにコミット
    conn.commit()

    # データベースとの接続を閉じる
    conn.close()


def get_data_from_db(db:str,table:str,key:str,id:int) -> list:
    """
        データベースからデータを取得する

        Args:
            db (str): データベースのパス
            table (str): データベースの作業テーブル
            key (str): 検索対象となるカラム
            id (int): 検索対象のid
            
        Returns:  
            results_list (list): 
    """

    # データベースに接続
    conn = connect_database(db)
    c = conn.cursor()

    #クエリに問題がないかチェック
    validate_input_query([table,key])

    # table内からidと一意するデータをkey(カラム)の中から検索し,全カラムのデータを所得する
    # 形式:[(カラム1-1,カラム2-1,カラム3-1,・・・),(カラム2-1,カラム2-2,カラム3-2,・・・),・・・]
    query = f"SELECT * FROM {table} WHERE {key} = ?"
    c.execute(query, (id,))
    results_list = c.fetchall()

    # 検索結果が0件(存在しない)場合404エラーを発生
    if len(results_list)==0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Data that meet the specified conditions do not exist.") 
        
    #データベースとの接続を閉じる
    conn.close()

    return results_list

def count_db_record(db:str,table:str,key:str) -> int:
    """
        データベースのカラムが持つデータ数をカウント

        Args:
            db (str): データベースのパス
            table (str): データベースの作業テーブル
            key (str): カウント対象のカラム
            
        Returns:  
            count (int): データ数 
    """

    # データベースに接続
    conn = connect_database(db)
    c = conn.cursor()

    # クエリに問題がないかチェック
    validate_input_query([table,key])

    # table内のkey(カラム)に要素が何個あるかをカウントし取得
    query = f"SELECT COUNT({key}) FROM {table}"
    c.execute(query)
    count = c.fetchone()[0]

    # データベースとの接続を閉じる
    conn.close()

    return count

if __name__ == '__main__':
    #add_data_from_db('car.db',"INSERT INTO enemy_car_data (car_id, path_img, name, luk, text) VALUES (2, 'database/car_img/car2.png', 'Feline Fury', 4, 'With its sleek exterior, cozy interior, and advanced features such as a built-in laser pointer for entertainment, this car is perfectly designed for cat lovers. You can be assured that every drive will feel like a catwalk. Meowvelous!')")
    pass