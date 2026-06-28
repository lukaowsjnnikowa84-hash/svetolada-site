// Главная функция анализа
function analyzeUser(data, options = {}) {
  // data: { name, birthDate, birthTime, birthPlace, partnerBirthDate }
  // options: { fullReport: true/false, selectedBlocks: [...], selectedSections: [...] }

  // 1. Подготовка исходных данных
  const parsed = prepareBaseData(data);

  // 2. Общие расчёты (нумерология, астрология и т.п.)
  const calc = calculateAll(parsed);

  // 3. Формирование блоков
  const result = {
    osnovnye_vibracii: generateBlockOsnovnyeVibracii(parsed, calc),
    karma_i_put_dushi: generateBlockKarmaIPutDushi(parsed, calc),
    psihologia_i_vnutrenniy_mir: generateBlockPsihologia(parsed, calc),
    telo_energia_zdorovie: generateBlockTeloEnergiaZdorovie(parsed, calc),
    realizacia_v_mire: generateBlockRealizaciaVMire(parsed, calc),
    otnoshenia_i_semya: generateBlockOtnosheniaISemya(parsed, calc),
    vremya_i_vyvod: generateBlockVremyaIVyvod(parsed, calc),
  };

  // 4. Фильтрация по режиму (полный / по блокам / по разделам)
  return filterResultByOptions(result, options);
}

// ---------------- БАЗОВАЯ ПОДГОТОВКА ДАННЫХ ----------------

function prepareBaseData(data) {
  // Парсим дату рождения
  const [day, month, year] = data.birthDate.split(".");
  const birthDateObj = new Date(+year, +month - 1, +day);

  // Время рождения: точное / интервальное / неизвестно
  let birthTimeObj = null;
  if (data.birthTime && data.birthTime.type === "exact") {
    const [h, m] = data.birthTime.value.split(":");
    birthTimeObj = { hours: +h, minutes: +m };
  } else if (data.birthTime && data.birthTime.type === "interval") {
    birthTimeObj = getMiddleOfInterval(data.birthTime.value);
  }

  return {
    name: data.name,
    birthDateObj,
    birthTimeObj,
    birthPlace: data.birthPlace,
    partnerBirthDate: data.partnerBirthDate || null,
  };
}

function getMiddleOfInterval(interval) {
  // interval: 'morning' | 'day' | 'evening' | 'night'
  switch (interval) {
    case "morning":
      return { hours: 9, minutes: 0 };
    case "day":
      return { hours: 14, minutes: 0 };
    case "evening":
      return { hours: 19, minutes: 0 };
    case "night":
      return { hours: 1, minutes: 0 };
    default:
      return null;
  }
}

// ---------------- ОБЩИЕ РАСЧЁТЫ ----------------

function calculateAll(parsed) {
  // Здесь будут все расчёты, чтобы не дублировать логику в блоках

  const numerology = calculateNumerology(parsed);
  const astrology = calculateAstrology(parsed);
  const jyotish = calculateJyotish(parsed);
  const karma = calculateKarma(parsed, numerology, jyotish);
  const psychology = calculatePsychology(parsed, numerology);
  const health = calculateHealth(parsed, jyotish);
  const talents = calculateTalents(parsed, numerology, astrology);
  const relations = calculateRelations(parsed, numerology, astrology);
  const forecast = calculateForecast(parsed, numerology, jyotish);

  return {
    numerology,
    astrology,
    jyotish,
    karma,
    psychology,
    health,
    talents,
    relations,
    forecast,
  };
}

// Ниже — заглушки расчётов, потом ты их наполнишь своей логикой

function calculateNumerology(parsed) {
  return {
    section1: "Текст для раздела 1 нумерологии",
    section2: "Текст для раздела 2 нумерологии",
    // ...
    section19: "Текст для раздела 19 нумерологии",
  };
}

function calculateAstrology(parsed) {
  return {
    sun: "Солнце: описание",
    moon: "Луна: описание",
    ascendant: "Асцендент: описание",
  };
}

function calculateJyotish(parsed) {
  return {
    jyotish_summary: "Общий джйотиш-обзор",
  };
}

function calculateKarma(parsed, numerology, jyotish) {
  return {
    karma: "Кармический узор",
    soul_path: "Путь души",
    destiny: "Предназначение",
  };
}

function calculatePsychology(parsed, numerology) {
  return {
    psychology: "Психологический портрет",
    childhood: "Важные акценты детства",
  };
}

function calculateHealth(parsed, jyotish) {
  return {
    ayurveda: "Аюрведический тип и рекомендации",
    health: "Общее состояние и склонности",
    spiritual_practices: "Практики для гармонизации",
  };
}

function calculateTalents(parsed, numerology, astrology) {
  return {
    talents: "Основные таланты и сильные стороны",
    profession: "Рекомендации по профессии",
    finances: "Отношение к деньгам и финансовым потокам",
  };
}

function calculateRelations(parsed, numerology, astrology) {
  return {
    relationships: "Стиль любви и отношений",
    family: "Семейные сценарии",
    compatibility: "Совместимость или идеальный партнёр",
  };
}

function calculateForecast(parsed, numerology, jyotish) {
  return {
    forecast: "Прогноз по времени (год/месяц)",
    final_summary: "Общее заключение и рекомендации",
  };
}

// ---------------- ГЕНЕРАЦИЯ БЛОКОВ ----------------

function generateBlockOsnovnyeVibracii(parsed, calc) {
  return {
    numerologia: calc.numerology,
    astrologia: {
      sun: calc.astrology.sun,
      moon: calc.astrology.moon,
      ascendant: calc.astrology.ascendant,
    },
    aspekty: "Описание аспектов (позже дополнишь)",
    jyotish: calc.jyotish.jyotish_summary,
  };
}

function generateBlockKarmaIPutDushi(parsed, calc) {
  return {
    karma: calc.karma.karma,
    soul_path: calc.karma.soul_path,
    destiny: calc.karma.destiny,
  };
}

function generateBlockPsihologia(parsed, calc) {
  return {
    psychology: calc.psychology.psychology,
    childhood: calc.psychology.childhood,
  };
}

function generateBlockTeloEnergiaZdorovie(parsed, calc) {
  return {
    ayurveda: calc.health.ayurveda,
    health: calc.health.health,
    spiritual_practices: calc.health.spiritual_practices,
  };
}

function generateBlockRealizaciaVMire(parsed, calc) {
  return {
    talents: calc.talents.talents,
    profession: calc.talents.profession,
    finances: calc.talents.finances,
  };
}

function generateBlockOtnosheniaISemya(parsed, calc) {
  return {
    relationships: calc.relations.relationships,
    family: calc.relations.family,
    compatibility: calc.relations.compatibility,
  };
}

function generateBlockVremyaIVyvod(parsed, calc) {
  return {
    forecast: calc.forecast.forecast,
    final_summary: calc.forecast.final_summary,
  };
}

// ---------------- ФИЛЬТРАЦИЯ ПО ВЫБОРУ ПОЛЬЗОВАТЕЛЯ ----------------

function filterResultByOptions(result, options) {
  if (options.fullReport || !options.selectedBlocks) {
    return result;
  }

  const filtered = {};

  options.selectedBlocks.forEach((blockKey) => {
    if (result[blockKey]) {
      filtered[blockKey] = result[blockKey];

      // Если есть selectedSections — можно сузить ещё сильнее
      if (options.selectedSections && options.selectedSections[blockKey]) {
        const sections = options.selectedSections[blockKey];
        const block = result[blockKey];
        const subFiltered = {};

        sections.forEach((secKey) => {
          if (block[secKey] !== undefined) {
            subFiltered[secKey] = block[secKey];
          }
        });

        filtered[blockKey] = subFiltered;
      }
    }
  });

  return filtered;
}

// ---------------- Экспорт (если используешь модули) ----------------
// export { analyzeUser };
