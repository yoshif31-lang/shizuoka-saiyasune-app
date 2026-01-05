export type UnitId = 'luna' | 'nagi' | 'koku' | 'rei' | 'hibiki';

export interface Unit {
  id: UnitId;
  name: string;
  description: string;
  color: string;
}

export const units: Unit[] = [
  { id: 'luna', name: 'ルナ', description: 'GENESIS デザイン担当・メインAI', color: 'blue' },
  { id: 'nagi', name: '凪', description: 'GENESIS 副司令・現場指揮官', color: 'green' },
  { id: 'koku', name: '刻', description: 'GENESIS 統括エンジニア', color: 'purple' },
  { id: 'rei', name: '零', description: 'GENESIS デバッグ兼セキュリティ監視官', color: 'red' },
  { id: 'hibiki', name: '響', description: 'GENESIS ムードメーカー・士気向上', color: 'yellow' },
];

export const getUnitById = (id: UnitId) => units.find(u => u.id === id) || units[0];
