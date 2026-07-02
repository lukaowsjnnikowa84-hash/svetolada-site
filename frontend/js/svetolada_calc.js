/*  
    Светолада — расчёты анализа
    Основной модуль, который формирует структуру данных для 27 разделов.
    Здесь происходит обработка введённых данных и подготовка результата.
*/

// Главная функция анализа
function generateSvetoladaAnalysis(userData) {
  const { name, birthdate, partner } = userData;

  // Преобразование даты
  const birth = new Date(birthdate);

  // Основная структура результата
  const result = {
    name: name,
    birthdate: birthdate,
    partner: partner || null,
    sections: {},
  };

  // Заполнение всех 27 разделов
  for (let i = 1; i <= 27; i++) {
    result.sections[i] = generateSection(i, userData);
  }

  return result;
}

/*  
    Генерация отдельного раздела
    Здесь мы будем подключать формулы, расчёты и тексты.
*/
function generateSection(sectionNumber, userData) {
  return {
    title: getSectionTitle(sectionNumber),
    text: getSectionText(sectionNumber, userData),
  };
}

/*  
    Заголовки всех 27 разделов
*/
function getSectionTitle(num) {
  const titles = {
    1: "Характер",
    2: "Эмоции",
    3: "Мышление",
    4: "Воля",
    5: "Темперамент",
    6: "Общение и социальные связи",
    7: "Отношения и близость",
    8: "Любовь и партнёрство",
    9: "Семья и родовые сценарии",
    10: "Род и наследственные программы",
    11: "Детство и формирование личности",
    12: "Травмы и точки роста",
    13: "Предназначение и путь реализации",
    14: "Таланты и внутренние ресурсы",
    15: "Работа и самореализация",
    16: "Финансовая энергия и поток изобилия",
    17: "Здоровье и жизненная сила",
    18: "Психосоматика и тело души",
    19: "Кризисы и трансформации",
    20: "Жизненные циклы и этапы пути",
    21: "Партнёрство и совместный путь",
    22: "Дети и родовая линия",
    23: "Дом и энергия пространства",
    24: "Духовность и связь с высшим",
    25: "Энергетический потенциал и защита",
    26: "Кармические задачи и уроки души",
    27: "Итоговая картина личности и путь души",
  };
  return titles[num];
}

/*  
    Получение текста раздела
    Здесь будет подключаться svetoladaTexts.js
*/
function getSectionText(sectionNumber, userData) {
  if (typeof svetoladaTexts !== "undefined") {
    return svetoladaTexts[sectionNumber](userData);
  } else {
    return "Текст раздела загружается...";
  }
}

/*  
    Экспорт для использования в других файлах
*/
if (typeof module !== "undefined") {
  module.exports = { generateSvetoladaAnalysis };
}
