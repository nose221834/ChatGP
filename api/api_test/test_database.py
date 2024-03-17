from fastapi import APIRouter, Security, Form
from utils.auth import validate_api_key
from models import InputTextModel
from database.database_operation import DatabaseOperator

router = APIRouter()

@router.get("/test/database/get_all")
def api_get_all_data_from_db(db:str,table:str,api_key: str = Security(validate_api_key)):
    """
        指定したテーブルの全データをデータベースから取得する

        Args:
            db (str): データベースのパス
            table (str): データベースの作業テーブル
            
        Returns:  
            all_data_in_table (list): テーブル内の全データ
    """
    db_operator = DatabaseOperator(db,table)

    all_data_in_table = db_operator.get_all_data_from_db()
    
    return {"all_data_in_table": all_data_in_table}

@router.post("/test/database/add_data")
def api_adding_data_to_db(db:str,table:str,columns_list:list = Form(...),values_list:list = Form(...),api_key: str = Security(validate_api_key)):
    """
        データベースにデータを追加する

        Args:
            db (str): データベースのパス
            table (str): 作業テーブルの名称
            columns_list (list): テーブルが持つカラムのリスト
            values_list (list): データベースに保存するデータのリスト,保存先はcolumns_listのインデックスと対応している
        Returns:  
            None
    """
    db_operator = DatabaseOperator(db,table)

    db_operator.adding_data_to_db(columns_list,values_list)

@router.delete("/test/database/delete_data")
def api_deleting_db_data(db:str,table:str,column:str,record:int | str,api_key: str = Security(validate_api_key)):
    """
        データベースのデータを削除

        Args:
            db (str): データベースのパス
            table (str): 作業テーブルの名称
            column (str): 検索カラム
            record (int | str): 削除するレコード
        Returns:  
            None
    """
    db_operator = DatabaseOperator(db,table)

    db_operator.deleting_db_data(column,record)
