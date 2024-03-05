import random

def validate_luk(luk: str) -> int:
    """
        車のLUKの値を検証する関数
        Args:
            luk (str): LUKの値
        Returns:
            int: LUKの値
        Raises:
            ValueError: LUKがint型または'LUK'でない場合
        Behavior:
            LUKが0-6の文字型の数字の場合、int型に変換して返す
            LUKが"LUK"の場合、ランダムなLUKの値を返す
    """
    if luk == "LUK":
        luk_rand = random.randint(0, 6)
        print("luk is", luk, "So, it's updated to", luk_rand)
        return luk_rand
    else:
        try:
            luk = int(luk)
            if 0 <= luk <= 6:
                print("luk is", luk)
                return luk
            else:
                raise ValueError("LUK is out of range")
        except ValueError:
            raise ValueError("LUK is not int type")