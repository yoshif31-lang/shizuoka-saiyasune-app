const fs = require('fs');

// ここでSupabaseから最新データを取得したと仮定して計算
// 本来はSupabaseの最新レコードから「最安値」を自動算出します
async function runAutoNagi() {
    const filePath = './index.html';
    let html = fs.readFileSync(filePath, 'utf8');

    // 例：最新の平均から「120円以下なら買い」と凪が判断
    const NEW_BEST_PRICE = 120; 

    // HTML内の判定基準を凪が書き換え
    const updatedHtml = html.replace(/const BEST_PRICE = \d+;/, `const BEST_PRICE = ${NEW_BEST_PRICE};`);
    
    fs.writeFileSync(filePath, updatedHtml);
    console.log(`凪：判定基準を ${NEW_BEST_PRICE}円 に更新しました。`);
}

runAutoNagi();
