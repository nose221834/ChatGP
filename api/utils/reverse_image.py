from PIL import Image
from io import BytesIO

def reverse_image(image: bytes | Image.Image):
    """
        画像を反転する
        Args:
            image (bytes or PIL.Image): 画像
        Returns:
            reversed_image: 反転した画像(バイナリ)
        Raises:
            TypeError: imageがbytesまたはPIL.Imageでない場合
    """

    # 画像(バイナリ)をImageに変換
    if isinstance(image, bytes):
        image = Image.open(BytesIO(image))
    if not isinstance(image, Image.Image):
        raise TypeError("image must be bytes or PIL.Image")
    
    # 画像を反転しPNGで保存
    reversed_image = image.transpose(Image.FLIP_LEFT_RIGHT) 
    buffered = BytesIO()
    reversed_image.save(buffered, format="PNG")
    
    return buffered.getvalue() # 画像(バイナリ)を取得