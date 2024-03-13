from pathlib import Path
from io import BytesIO
from PIL import Image

def save_image(image: bytes, output_path: str | Path)->None:
    """
        画像を保存する
        Args:
            image (bytes): 画像データ
            path (str | Path): 保存先のパス
        Return:
            None
    """
    img_buffer = BytesIO(image)
    img = Image.open(img_buffer)
    img.save(output_path)
