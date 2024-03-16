from fastapi import APIRouter, Security
from utils.auth import validate_api_key
from models import InputTextModel
from database.database_operation import get_all_data_from_db

router = APIRouter()

@router.get("/test/database/get_all")
def translation_jp_to_en(db:str,table:str,api_key: str = Security(validate_api_key)):
    """
        指定したテーブルの全データをデータベースから取得する

        Args:
            db (str): データベースのパス
            table (str): データベースの作業テーブル
            
        Returns:  
            all_data_in_table (list): テーブル内の全データ
    """

    all_data_in_table = get_all_data_from_db(db,table)
    
    return {"all_data_in_table": all_data_in_table}