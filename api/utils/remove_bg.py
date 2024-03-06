from PIL import Image
from io import BytesIO
from rembg import remove

def remove_background(image: bytes | Image.Image) -> bytes:
    """
        画像の背景を透過する
        Args:
            image (bytes or PIL.Image): 画像
        Returns:
            removebg_image: 背景を透過した画像(バイナリ)
        Raises:
            TypeError: imageがbytesまたはPIL.Imageでない場合
    """
    if isinstance(image, bytes):
        image = Image.open(BytesIO(image)) # 画像(バイナリ)をImageに変換
    if not isinstance(image, Image.Image):
        raise TypeError("image must be bytes or PIL.Image")
    removebg_image = remove(image) # 背景を透過した画像に変換
    buffered = BytesIO()
    removebg_image.save(buffered, format="PNG")
    return buffered.getvalue() # 画像(バイナリ)を取得
