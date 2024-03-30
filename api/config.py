from dataclasses import dataclass

# プレーヤーの車の情報を扱う際の変数
@dataclass(frozen=True)
class PlayerCarKeys:
    image: str = "player_car_image"
    car_name: str = "player_car_name"
    luck: str = "player_car_luck"
    instruction: str = "player_car_instruction"

# 敵キャラクターの情報を扱う際の変数
@dataclass(frozen=True)
class EnemyCarKeys:
    image: str = "enemy_car_image"
    car_name: str = "enemy_car_name"
    luck: str = "enemy_car_luck"
    instruction: str = "enemy_car_instruction"

# レースの進行をChatGPTで生成した際の出力変数
@dataclass(frozen=True)
class RaceInfoKeys:
    generated_text: str = "generated_text"
    first_place: str = "first_place"
    second_place: str = "second_place"
    third_place: str = "third_place"
    fourth_place: str = "fourth_place"