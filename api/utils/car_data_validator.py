import random
from fastapi import  HTTPException,status

def validation_element_car_data(result:list,error_count:int):

    """
        ChatGPTが出力した車のステータスがフォーマットに則っているか確認
        3回失敗したらエラーを出力
        Args:
            result (list): 
        Returns:
            bool: returnは正常/異常(0/1)
        Raises:
            HTTP_502_BAD_GATEWAY: ChatGPTが LUK|NAME|TEXT のフォーマットに従っていない.
    """
    try:

        #lukが数値になっているか？　ChatGPTの出力(str)をintに変換
        result[0] = int(result[0])

        assert len(result) == 3 
        return False

    except:
        if error_count >= 4:
            raise HTTPException(
                status_code=status.HTTP_408_REQUEST_TIMEOUT,
                detail="ChatGPT output does not follow the format",
            )
        else:
            return True

