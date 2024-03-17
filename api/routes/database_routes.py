
from database.database_operation import get_data_from_db,count_db_record
from utils.auth import validate_api_key
from fastapi import APIRouter, Security
from PIL import Image
from base64 import b64encode
import random
from config import EnemyCarKeys
from utils.remove_bg import remove_background
from utils.reverse_image import reverse_image

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

    #レコードの数
    total_records = count_db_record(db,table,key)

    #ランダムに車を選択
    car_id = random.randint(1, total_records)

    #データベースから敵の車データを取得
    [list_car_data] = get_data_from_db(db,table,key,car_id)

    #pathから画像を取得
    print("list_car_data", list_car_data[1])
    img = Image.open(list_car_data[1])


    #背景を透過
    rembg: bytes = remove_background(img)

    #画像を逆転
    reverse: bytes = reverse_image(rembg)

    # 敵キャラクターの運勢を取得
    luck = int(list_car_data[3])

    return {EnemyCarKeys.image: b64encode(reverse),
            EnemyCarKeys.name:list_car_data[2],
            EnemyCarKeys.luck:luck,
            EnemyCarKeys.instruction: list_car_data[4]}


