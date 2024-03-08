from dataclasses import dataclass

@dataclass(frozen=True)
class RaceInfoKeys:
    generated_text: str = "generated_text"
    first_place: str = "first_place"
    second_place: str = "second_place"
    third_place: str = "third_place"
    fourth_place: str = "fourth_prace"