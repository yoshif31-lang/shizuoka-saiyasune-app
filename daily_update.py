import pandas as pd
import random

def patrol():
    # 🛒 静岡の特売データをパトロールするシミュレーションだよ
    # 今後はここに本物のスクレイピングコードを入れていけるよ！
    
    # 983.pngで表示されていたデータをベースに最新版を作るよ
    items = [
        ["卵 (10個入)", 198, "静岡スーパー A店"],
        ["鶏むね肉 (100g)", 68, "激安マート B店"],
        ["キャベツ (1玉)", 150, "地元の八百屋"],
        ["牛乳 (1L)", 210, "浜松フードマーケット"],
        ["納豆 (3パック)", 98, "磐田サンライズマート"]
    ]
    
    # 価格を少しだけ変動させて「生きてるデータ」にするよ
    for i in range(len(items)):
        items[i][1] = int(items[i][1] * random.uniform(0.95, 1.05))
    
    df = pd.DataFrame(items, columns=["商品名", "価格", "店舗名"])
    df.to_csv("supermarket_prices.csv", index=False, encoding="utf-8")
    print("価格パトロールが完了したよ！")

if __name__ == "__main__":
    patrol()
