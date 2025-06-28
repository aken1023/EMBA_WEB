// AI詩意描述生成庫
export interface PoeticStyle {
  name: string
  description: string
  generator: (caption: string, tags: string[]) => string
}

// 詩意詞彙庫
const poeticVocabulary = {
  scenes: {
    gathering: ["雅集", "聚會", "盛會", "佳會", "雅聚", "歡聚"],
    academic: ["學府", "講堂", "論壇", "研討", "學術殿堂", "智慧碰撞"],
    sports: ["競技", "運動場", "綠茵", "賽場", "體育精神", "英姿颯爽"],
    casual: ["閒暇", "悠然", "輕鬆", "愜意", "自在", "舒適"],
    formal: ["莊重", "典雅", "隆重", "正式", "儀式", "禮儀"],
  },
  emotions: {
    joy: ["歡樂", "喜悅", "愉快", "開心", "歡欣", "快樂"],
    peaceful: ["寧靜", "安詳", "平和", "恬靜", "悠然", "淡然"],
    elegant: ["優雅", "典雅", "雅致", "精緻", "高雅", "文雅"],
    warm: ["溫馨", "溫暖", "親切", "和睦", "融洽", "和諧"],
  },
  actions: {
    talking: ["談笑風生", "促膝長談", "暢所欲言", "侃侃而談", "娓娓道來"],
    learning: ["切磋琢磨", "博學多聞", "學而時習", "溫故知新", "求知若渴"],
    celebrating: ["舉杯同慶", "共襄盛舉", "歡聲笑語", "載歌載舞", "其樂融融"],
    competing: ["一較高下", "技藝精湛", "全力以赴", "奮勇爭先", "勇往直前"],
  },
  classical: {
    time: ["歲月如歌", "時光荏苒", "春秋幾度", "歲月悠悠", "光陰似箭"],
    friendship: ["友誼長存", "情深如海", "知音難覓", "莫逆之交", "患難與共"],
    achievement: ["功成名就", "學有所成", "才華橫溢", "出類拔萃", "卓爾不群"],
    nature: ["春風得意", "秋高氣爽", "花好月圓", "風和日麗", "山清水秀"],
  },
}

// 季節詞彙
const seasonalWords = {
  spring: ["春意盎然", "春風和煦", "花開滿園", "生機勃勃"],
  summer: ["夏日炎炎", "綠意盎然", "陽光明媚", "熱情似火"],
  autumn: ["秋高氣爽", "金桂飄香", "楓葉滿山", "收穫滿滿"],
  winter: ["冬日暖陽", "雪花紛飛", "歲末年終", "溫暖如春"],
}

// 根據標籤選擇合適的詞彙
function selectVocabulary(tags: string[], category: keyof typeof poeticVocabulary): string[] {
  const vocab = poeticVocabulary[category]
  const relevantWords: string[] = []

  for (const [key, words] of Object.entries(vocab)) {
    if (tags.some((tag) => tag.includes(key) || words.some((word) => tag.includes(word.slice(0, 2))))) {
      relevantWords.push(...words)
    }
  }

  return relevantWords.length > 0 ? relevantWords : Object.values(vocab).flat()
}

// 古典雅韻風格生成器
function generateClassicalStyle(caption: string, tags: string[]): string {
  const scenes = selectVocabulary(tags, "scenes")
  const emotions = selectVocabulary(tags, "emotions")
  const actions = selectVocabulary(tags, "actions")
  const classical = poeticVocabulary.classical

  const randomScene = scenes[Math.floor(Math.random() * scenes.length)]
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
  const randomAction = actions[Math.floor(Math.random() * actions.length)]
  const randomClassical =
    Object.values(classical).flat()[Math.floor(Math.random() * Object.values(classical).flat().length)]

  const templates = [
    `${randomScene}時光，${randomAction}，${randomEmotion}中見真情。${randomClassical}，此情此景，永誌難忘。`,
    `${randomEmotion}的${randomScene}，眾人${randomAction}，${randomClassical}。美好時光，如詩如畫。`,
    `此番${randomScene}，${randomAction}，${randomEmotion}滿懷。${randomClassical}，珍貴回憶，歷久彌新。`,
    `${randomScene}佳會，${randomEmotion}氛圍中，大家${randomAction}。${randomClassical}，溫馨時刻，值得珍藏。`,
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

// 現代詩意風格生成器
function generateModernPoetic(caption: string, tags: string[]): string {
  const scenes = selectVocabulary(tags, "scenes")
  const emotions = selectVocabulary(tags, "emotions")

  const templates = [
    `在這個${emotions[0] || "美好"}的時刻\n${scenes[0] || "聚會"}如約而至\n每一個笑容都是最珍貴的記憶`,
    `時光定格在這一瞬間\n${emotions[0] || "溫馨"}的氛圍包圍著我們\n這就是生活中最美的詩篇`,
    `${scenes[0] || "相聚"}的意義\n不在於地點的華麗\n而在於心靈的相通\n和那份${emotions[0] || "真摯"}的情感`,
    `鏡頭捕捉的不只是影像\n更是那份${emotions[0] || "純真"}的快樂\n和永不褪色的友誼光芒`,
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

// 俳句風格生成器
function generateHaikuStyle(caption: string, tags: string[]): string {
  const scenes = selectVocabulary(tags, "scenes")
  const emotions = selectVocabulary(tags, "emotions")
  const seasonal = Object.values(seasonalWords).flat()

  const templates = [
    `${scenes[0] || "聚會"}時光\n${emotions[0] || "歡樂"}滿心間\n${seasonal[0] || "歲月如歌"}`,
    `${emotions[0] || "溫馨"}瞬間\n${scenes[0] || "相聚"}話桑麻\n友誼永長存`,
    `光影記錄\n${emotions[0] || "美好"}的時刻\n${seasonal[0] || "春風得意"}`,
    `${scenes[0] || "佳會"}如期\n${emotions[0] || "喜悅"}在心頭\n回憶永珍藏`,
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

// 情境描述生成器
function generateContextualDescription(context: string, caption: string): string {
  const contextTemplates = {
    event: [
      "盛會如期而至，賓朋滿座，歡聲笑語中見真情，此情此景，永誌難忘。",
      "活動精彩紛呈，參與者熱情高漲，每一個瞬間都值得珍藏，美好回憶歷久彌新。",
      "聚會氛圍溫馨，大家談笑風生，在這個特別的時刻，友誼之花綻放得格外燦爛。",
    ],
    academic: [
      "學者雲集，智慧碰撞，學術殿堂書聲朗朗，知識的光芒照亮前行的道路。",
      "論壇精彩，思辨激烈，在知識的海洋中遨遊，每一次交流都是智慧的升華。",
      "講座深入淺出，聽眾專注聆聽，學術氛圍濃厚，求知的熱情如火如荼。",
    ],
    sports: [
      "競技場上，英姿颯爽，運動精神展現無遺，每一次拼搏都是青春的讚歌。",
      "綠茵場上展風采，技藝精湛令人讚嘆，體育競技中見真章，友誼第一比賽第二。",
      "運動健兒奮勇爭先，汗水揮灑間見證努力，競技精神激勵人心向上。",
    ],
    class: [
      "同窗情深，歲月如歌，重聚時光格外珍貴，青春歲月的美好永遠難忘。",
      "老同學相聚，話當年求學時光，友誼之樹常青，同窗之情永不褪色。",
      "班級聚會溫馨如家，大家暢所欲言，回憶校園時光，友誼歷久彌堅。",
    ],
    casual: [
      "閒暇時光，悠然自得，生活中的小確幸，就在這些平凡而美好的瞬間。",
      "輕鬆愉快的時光，沒有拘束，只有真誠的交流和發自內心的笑容。",
      "日常生活中的美好片段，簡單而純真，這就是生活最真實的模樣。",
    ],
  }

  const templates = contextTemplates[context as keyof typeof contextTemplates] || contextTemplates.casual
  return templates[Math.floor(Math.random() * templates.length)]
}

// 詩意風格定義
export const poeticStyles: PoeticStyle[] = [
  {
    name: "古典雅韻",
    description: "使用傳統文言文風格，典雅莊重",
    generator: generateClassicalStyle,
  },
  {
    name: "現代詩意",
    description: "融合現代語言的詩意表達",
    generator: generateModernPoetic,
  },
  {
    name: "俳句風格",
    description: "簡潔優美的三行詩格式",
    generator: generateHaikuStyle,
  },
]

// 生成多種風格的詩意描述
export function generateMultiplePoeticDescriptions(
  caption: string,
  tags: string[],
  count = 3,
): { style: string; description: string }[] {
  const results: { style: string; description: string }[] = []

  // 為每種風格生成描述
  poeticStyles.forEach((style) => {
    if (results.length < count) {
      results.push({
        style: style.name,
        description: style.generator(caption, tags),
      })
    }
  })

  // 如果需要更多描述，重複生成
  while (results.length < count) {
    const randomStyle = poeticStyles[Math.floor(Math.random() * poeticStyles.length)]
    results.push({
      style: `${randomStyle.name} (變體)`,
      description: randomStyle.generator(caption, tags),
    })
  }

  return results
}

// 根據情境生成描述
export { generateContextualDescription }

// 根據季節生成描述
export function generateSeasonalDescription(month: number, caption: string): string {
  let season: keyof typeof seasonalWords

  if (month >= 3 && month <= 5) season = "spring"
  else if (month >= 6 && month <= 8) season = "summer"
  else if (month >= 9 && month <= 11) season = "autumn"
  else season = "winter"

  const seasonalWord = seasonalWords[season][Math.floor(Math.random() * seasonalWords[season].length)]

  return `${seasonalWord}的時節，${caption}，此情此景，如詩如畫，值得永遠珍藏。`
}
