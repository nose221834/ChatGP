
from database.database_operation import get_data,count_record
from utils.auth import validate_api_key
from fastapi import APIRouter, Security
from PIL import Image
from base64 import b64encode
import random
router = APIRouter()

@router.get("/data/enemy")
def get_enemy_car( api_key: str = Security(validate_api_key)):
    """
        敵キャラクターの情報を取得
        Args:

        Returns:
            enemy_car_image (bytes):入力されたidに対応した車の画像バイナリー
            enemy_car_name (str):車の名前
            enemy_car_luck (int):車の運勢
            enemy_car_introduction (str): 車の解説

        Raises:
            HTTP_404_NOT_Found: 指定したデータベースが存在しない
            HTTP_400_BAD_REQUEST: 不正な入力

    """

    db='database/.db'
    table = 'enemy_car_data'
    key = 'car_id'

    #レコードの数
    total_records = count_record(db,table,key)

    #ランダムに車を選択
    car_id = random.randint(1, total_records)

    #データベースから敵の車データを取得
    [list_car_data] = get_data(db,table,key,car_id)

    enemy_car_luck = int(list_car_data[3])
    #pathから画像を取得
    img = Image.open(list_car_data[1])

    #バイナリーに変換
    img_binary = img.tobytes()

    return {"enemy_car_image": b64encode(img_binary),"enemy_car_name":list_car_data[2],"enemy_car_luck": enemy_car_luck,"enemy_car_introduction": list_car_data[4]}

