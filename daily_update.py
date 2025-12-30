import pandas as pd
import random

def patrol():
    items = [
        ["卵 (10個入)", 198, "静岡スーパー A店"],
        ["鶏むね肉 (100g)", 68, "激安マート B店"],
        ["キャベツ (1玉)", 150, "地元の八百屋"]
    ]
    for i in range(len(items)):
        items[i][1] = int(items[i][1] * random.uniform(0.9, 1.1))
    
    df = pd.DataFrame(items, columns=["商品名", "価格", "店舗名"])
    df.to_csv("supermarket_prices.csv", index=False, encoding="utf-8")

if __name__ == "__main__":
    patrol()
