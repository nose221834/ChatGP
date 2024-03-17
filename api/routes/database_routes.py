
from database.database_operation import DatabaseOperator
from utils.auth import validate_api_key
from fastapi import APIRouter, Security
from PIL import Image
from base64 import b64encode
import random
from config import EnemyCarKeys
from io import BytesIO

router = APIRouter()

@router.get("/create/enemy")
def get_enemy_car( api_key: str = Security(validate_api_key)):
    """
        敵キャラクターの情報を取得
        Args:
            api_key (str): APIにアクセスするために必要なセキュリティーキー
            
        Returns:
            enemy_car_image (bytes):入力されたidに対応した車の画像バイナリー
            enemy_car_name (str):車の名前
            enemy_car_luck (int):車の運勢
            enemy_car_instruction (str): 車の解説
            

        Raises:
            HTTP_404_NOT_Found: 指定したデータベースが存在しない
            HTTP_400_BAD_REQUEST: 不正な入力

    """

    db = 'database/.db' # データベースのパス
    table = 'enemy_car_data' # テーブルの名称
    key = 'car_id' # 検索に使用するカラムの名前

    db_operator = DatabaseOperator(db,table)
    #レコードの数
    total_records = db_operator.count_record(key)


    #ランダムに車を選択
    car_id = random.randint(1, total_records)

    #データベースから敵の車データを取得
    [list_car_data] = db_operator.get_data_from_db(key,car_id)

    #pathから画像を取得
    img = Image.open(list_car_data[1])

    # 画像データをPNG形式でbufferedに保存
    buffered = BytesIO()
    img.save(buffered, format="PNG")

    # 敵キャラクターの運勢を取得
    luck = int(list_car_data[3])

    return {EnemyCarKeys.image: b64encode(buffered.getvalue()),
            EnemyCarKeys.name:list_car_data[2],
            EnemyCarKeys.luck:luck,
            EnemyCarKeys.instruction: list_car_data[4]}


