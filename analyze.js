// ===============================
// 1. Получение данных из формы
// ===============================

function getUserData() {
  const params = new URLSearchParams(window.location.search);

  return {
    name: params.get("name"),
    birthdate: params.get("birthdate"),
    gender: params.get("gender"),
    birthplace: params.get("birthplace"),
    birthTime: params.get("birthtime"),
    birthTimeRange: params.get("birthtime_range"),
    partnerName: params.get("partner_name"),
    partnerBirthdate: params.get("partner_birthdate"),
  };
}

// ===============================
// 2. Интерпретация времени
// ===============================

function interpretBirthTime(user) {
  if (user.birthTime) {
    return `Точное время рождения: ${user.birthTime}`;
  }
  if (user.birthTimeRange) {
    const ranges = {
      morning: "Утро (06:00–11:59)",
      day: "День (12:00–17:59)",
      evening: "Вечер (18:00–22:59)",
      night: "Ночь (23:00–05:59)",
    };
    return `Примерное время рождения: ${ranges[user.birthTimeRange]}`;
  }
  return "Время рождения неизвестно";
}

// ===============================
// 3. Блоки анализа
// ===============================

function blockPersonality(user, timeInfo) {
  return {
    title: "Личность",
    content: `Анализ личности для ${user.name}.
Дата рождения: ${user.birthdate}.
${timeInfo}.
Место рождения: ${user.birthplace || "не указано"}.`,
  };
}

function blockSoul(user, timeInfo) {
  return {
    title: "Душа",
    content: `Глубинные мотивы и желания.
${timeInfo}.`,
  };
}

function blockDestiny(user, timeInfo) {
  return {
    title: "Судьба",
    content: `Ваш путь и задачи.
${timeInfo}.`,
  };
}

function blockIdealPartner(user) {
  return {
    title: "Идеальный партнёр",
    content: user.partnerName
      ? `Партнёр: ${user.partnerName}, дата рождения: ${user.partnerBirthdate || "не указана"}`
      : "Ваш идеальный партнёр — человек с мягкой энергией и золотым сердцем.",
  };
}

// ===============================
// 4. Сборка отчёта
// ===============================

function buildReport(selectedTile, user) {
  const timeInfo = interpretBirthTime(user);
  const blocks = [];

  switch (selectedTile) {
    case "full":
      blocks.push(
        blockPersonality(user, timeInfo),
        blockSoul(user, timeInfo),
        blockDestiny(user, timeInfo),
        blockIdealPartner(user),
      );
      break;
    case "personality":
      blocks.push(blockPersonality(user, timeInfo));
      break;
    case "soul":
      blocks.push(blockSoul(user, timeInfo));
      break;
    case "destiny":
      blocks.push(blockDestiny(user, timeInfo));
      break;
    case "ideal":
      blocks.push(blockIdealPartner(user));
      break;
    default:
      alert("Ошибка: неизвестная панель.");
  }

  return blocks;
}

// ===============================
// 5. Заглушка PDF
// ===============================

function exportToPDF(blocks) {
  console.log("Готовим PDF из блоков:", blocks);
  alert("PDF будет создан позже — структура готова!");
}
