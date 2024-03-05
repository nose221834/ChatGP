import deepl
import os

translator = deepl.Translator(os.getenv("DEEPL_AUTH_KEY"))

def translation(text: str,before: str,after: str):
    # 翻訳を実行
    result = translator.translate_text(text, source_lang=before, target_lang=after)
    return result.text
