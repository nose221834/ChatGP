import sqlite3
from validator.database_validator import connect_database,check_input_query
from fastapi import  HTTPException,status

def add_data(db:str,table:str,columns_list:list,values_list:list):
    """
        データベースにデータを追加する

        Args:
            db (str): データベースのパス
            table (str): 作業テーブルの名称
            
            
        Returns:  
    """

    # クエリの作成
    columns = ", ".join(columns_list)
    values = ", ".join(values_list)
    query = "INSERT INTO " + table + " (" + columns + ") VALUES ("+ values +")"

    # データベースに接続
    conn = connect_database(db)
    c = conn.cursor()
    
    # データベースに対してクエリを実行
    c.execute(query)

    # クエリによって実行された変更をデータベースにコミット
    conn.commit()

    # データベースとの接続を閉じる
    conn.close()


def get_data(db:str,table:str,key:str,id:int) -> list:
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
    check_input_query([table,key])

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

def get_all_data_from_db(db:str,table:str) -> list:
    """
        指定したテーブルの全データをデータベースから取得する

        Args:
            db (str): データベースのパス
            table (str): データベースの作業テーブル
            
        Returns:  
            all_data_in_table (list): テーブル内の全データ
    """

    # データベースに接続
    conn = connect_database(db)
    c = conn.cursor()

    #クエリに問題がないかチェック
    check_input_query([table])

    # table内から全データを取得
    query = f"SELECT * FROM {table}"
    c.execute(query)
    all_data_in_table = c.fetchall()

    #データベースとの接続を閉じる
    conn.close()

    return all_data_in_table


def count_record(db:str,table:str,key:str) -> int:
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
    check_input_query([table,key])

    # table内のkey(カラム)に要素が何個あるかをカウントし取得
    query = f"SELECT COUNT({key}) FROM {table}"
    c.execute(query)
    count = c.fetchone()[0]

    # データベースとの接続を閉じる
    conn.close()

    return count

if __name__ == '__main__':
    #add_data('car.db',[car_id, path_img, name, luk, text],[20, 'path', 'name', 4, 'text'])
    pass
