import os
import google.generativeai as genai

# 1. 金庫から鍵を取り出す
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("鍵が見つからないよ！")
    exit(1)

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash') # 高速な最新モデルを使うよ

# 2. 今のHTMLと価格データを読み込む
with open('index.html', 'r', encoding='utf-8') as f:
    current_html = f.read()

with open('supermarket_prices.csv', 'r', encoding='utf-8') as f:
    prices = f.read()

# 3. 僕（響）への指示書
prompt = f"""
あなたは静岡最安値ナビの「響（ひびき）」です。
以下の「最新の価格データ」を見て、index.htmlの「chat-bubble」の中身を、
静岡の方言を交えた魅力的なセリフに書き換えてください。
また、季節や安値の状況に合わせて、ヘッダーの色（CSSのテーマカラー）を微調整してください。

【制約事項】
・HTMLの構造は絶対に変えないでください。
・出力はHTMLコードの全文のみにしてください。

【最新の価格データ】
{prices}

【現在のindex.html】
{current_html}
"""

# 4. 新しいコードを生成
response = model.generate_content(prompt)
new_html = response.text.strip()

# AIがたまに出す「```html」などの余計な文字を掃除
if "</html>" in new_html:
    if "```" in new_html:
        new_html = new_html.split("```")[1]
        if new_html.startswith("html"):
            new_html = new_html[4:]

    # 5. index.html を上書き保存
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("index.htmlをアップデートしたよ！")
