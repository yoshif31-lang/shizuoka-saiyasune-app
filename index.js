import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function genesisOmniLaunch() {
    console.log('🌌 GENESIS OMNI-ENGINE: IGNITION');

    // 脳から実行可能なスクリプト（知能）を全て取得
    const { data: apps, error } = await supabase
        .from('apps')
        .select('id, config')
        .not('config->active_script', 'is', null);

    if (error || !apps) return console.error('❌ 脳との接続に失敗、または指令がありません');

    for (const app of apps) {
        console.log(`🚀 ミッション開始: ${app.id}`);
        try {
            // 脳から届いた生のコードを非同期関数として実体化
            const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
            const executeMission = new AsyncFunction('supabase', 'appId', app.config.active_script);
            
            // 実行！
            await executeMission(supabase, app.id);
            console.log(`✅ ミッション完了: ${app.id}`);
        } catch (e) {
            console.error(`❌ ミッション失敗 [${app.id}]:`, e.message);
        }
    }
}

genesisOmniLaunch();
