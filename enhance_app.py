import os
import google.generativeai as genai

# 鍵を取り出す
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    exit(1)

genai.configure(api_key=api_key)
# 💡 安定しているモデル名に変更したよ
model = genai.GenerativeModel('gemini-pro') 

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open('supermarket_prices.csv', 'r', encoding='utf-8') as f:
    prices = f.read()

prompt = f"""
あなたは静岡最安値ナビの「響」です。
1. 最新データに基づいてchat-bubbleのセリフを静岡弁で更新してください。
2. アバターとフキダシを「画面右下」に固定（fixed bottom-6 right-6）してください。
3. 出力はHTML全文のみにしてください。

【データ】
{prices}
【HTML】
{html}
"""

try:
    response = model.generate_content(prompt)
    new_html = response.text.strip()
    if "</html>" in new_html:
        if "```" in new_html:
            new_html = new_html.split("```")[1].replace("html", "", 1).strip()
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("AIが更新したよ！")
except Exception as e:
    print(f"Error: {e}")
