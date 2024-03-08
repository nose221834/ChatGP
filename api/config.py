from dataclasses import dataclass

@dataclass(frozen=True)
class PlayerCarKeys:
    image: str = "player_car_image"
    name: str = "player_car_name"
    luck: str = "player_car_luck"
    instruction: str = "player_car_instruction"

@dataclass(frozen=True)
class EnemyCarKeys:
    image: str = "enemy_car_image"
    name: str = "enemy_car_name"
    luck: str = "enemy_car_luck"
    instruction: str = "enemy_car_instruction"

@dataclass(frozen=True)
class RaceInfoKeys:
    generated_text: str = "generated_text"
    first_place: str = "first_place"
    second_place: str = "second_place"
    third_place: str = "third_place"
    fourth_place: str = "fourth_prace"