import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import axios from 'axios';

// GENESIS CONNECTION
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// User-Agent偽装（偵察用迷彩）
const AXIOS_CONFIG = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

async function genesisPatrol() {
  console.log('🤖 GENESIS PATROL SYSTEM: ONLINE');

  // 1. 脳(Supabase)から指令を取得
  const { data: apps, error } = await supabase
    .from('apps')
    .select('id, title, config')
    .not('config', 'is', null);

  if (error) {
    console.error('❌ FATAL: 脳との通信不能', error);
    process.exit(1);
  }

  // 2. 指令実行
  for (const app of apps) {
    if (!app.config.patrol_targets) continue;
    console.log(`\n🔍 PATROL START: [${app.title}]`);

    for (const target of app.config.patrol_targets) {
      try {
        console.log(`   ➳ Target: ${target.store_name}`);
        const response = await axios.get(target.url, AXIOS_CONFIG);
        const $ = cheerio.load(response.data);
        
        const items = [];
        // リスト形式で抽出
        $(target.selector.list_item || 'body').each((i, el) => {
            const product = $(el).find(target.selector.product).text().trim();
            const price = $(el).find(target.selector.price).text().replace(/[^0-9]/g, '');
            if (product && price) items.push({ product, price });
        });

        // 3. 報告（データ保存）
        if (items.length > 0) {
            const records = items.map(item => ({
                app_id: app.id,
                data: {
                    store: target.store_name,
                    product: item.product,
                    price: item.price,
                    memo: 'AUTO PATROL'
                }
            }));
            await supabase.from('records').insert(records);
            console.log(`      ✅ Scouted ${items.length} items.`);
        } else {
            console.log(`      ⚠️ No items found. Check selectors.`);
        }
      } catch (e) {
        console.error(`   ❌ ERROR: ${target.store_name}`, e.message);
      }
    }
  }
}

genesisPatrol();
