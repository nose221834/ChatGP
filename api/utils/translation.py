import deepl
import os

translator = deepl.Translator(os.getenv("DEEPL_AUTH_KEY"))

def translation(text: str,before: str,after: str):

    """
        DeepL API を使用して翻訳を行う

        Args:
            text (str): 翻訳対象
            before (str): 翻訳前の言語コード
            after (str): 翻訳後の言語コード　一覧: https://www.deepl.com/ja/docs-api/translate-text/multiple-sentences

        Return:
            translated_text (str): 翻訳されたテキスト
    """

    # 翻訳
    result = translator.translate_text(text, source_lang=before, target_lang=after)
    translated_text = result.text

    return translated_text
