// ===============================
// 1. Получение данных из формы
// ===============================

function getUserData() {
  const params = new URLSearchParams(window.location.search);

  const timeMode = params.get("time_mode"); // exact / approx / unknown
  let birthTime = null;
  let birthTimeRange = null;

  if (timeMode === "exact") {
    birthTime = params.get("birthtime"); // "14:35"
  }

  if (timeMode === "approx") {
    birthTimeRange = params.get("birthtime_range"); // morning/day/evening/night
  }

  return {
    name: params.get("name"),
    birthdate: params.get("birthdate"),
    gender: params.get("gender"),

    timeMode: timeMode,
    birthTime: birthTime,
    birthTimeRange: birthTimeRange,
  };
}

// ===============================
// 2. Преобразование времени
// ===============================

function interpretBirthTime(user) {
  if (user.timeMode === "unknown") {
    return {
      mode: "unknown",
      description: "Время рождения неизвестно",
    };
  }

  if (user.timeMode === "exact") {
    return {
      mode: "exact",
      time: user.birthTime,
      description: `Точное время рождения: ${user.birthTime}`,
    };
  }

  if (user.timeMode === "approx") {
    const ranges = {
      morning: "Утро (06:00–11:59)",
      day: "День (12:00–17:59)",
      evening: "Вечер (18:00–22:59)",
      night: "Ночь (23:00–05:59)",
    };

    return {
      mode: "approx",
      range: user.birthTimeRange,
      description: `Примерное время рождения: ${ranges[user.birthTimeRange]}`,
    };
  }
}

// ===============================
// 3. Блоки анализа (пока шаблоны)
// ===============================

function blockPersonality(user, timeInfo) {
  return {
    title: "Личность",
    content: `Тут будет текст блока Личность для ${user.name}.
Время рождения: ${timeInfo.description}.`,
  };
}

function blockSoul(user, timeInfo) {
  return {
    title: "Душа",
    content: `Тут будет текст блока Душа.
${timeInfo.description}.`,
  };
}

function blockDestiny(user, timeInfo) {
  return {
    title: "Судьба",
    content: `Тут будет текст блока Судьба.
${timeInfo.description}.`,
  };
}

function blockShadows(user) {
  return {
    title: "Тени",
    content: `Тут будет текст блока Тени.`,
  };
}

function blockArchetypes(user) {
  return {
    title: "Архетипы",
    content: `Тут будет текст блока Архетипы.`,
  };
}

function blockYearEnergy(user) {
  return {
    title: "Энергия года",
    content: `Тут будет текст блока Энергия года.`,
  };
}

function blockMonthEnergy(user) {
  return {
    title: "Энергия месяца",
    content: `Тут будет текст блока Энергия месяца.`,
  };
}

function blockKarma(user) {
  return {
    title: "Кармические задачи",
    content: `Тут будет текст блока Кармические задачи.`,
  };
}

function blockPartner(user) {
  return {
    title: "Партнёр",
    content: `Тут будет текст блока Партнёр.`,
  };
}

function blockCompatibility(user) {
  return {
    title: "Совместимость",
    content: `Тут будет текст блока Совместимость.`,
  };
}

function blockIdealPartner(user) {
  return {
    title: "Идеальный партнёр",
    content: `Тут будет текст блока Идеальный партнёр.`,
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
        blockShadows(user),
        blockArchetypes(user),
        blockYearEnergy(user),
        blockMonthEnergy(user),
        blockKarma(user),
        blockPartner(user),
        blockCompatibility(user),
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

    case "shadows":
      blocks.push(blockShadows(user));
      break;

    case "archetypes":
      blocks.push(blockArchetypes(user));
      break;

    case "year":
      blocks.push(blockYearEnergy(user));
      break;

    case "month":
      blocks.push(blockMonthEnergy(user));
      break;

    case "karma":
      blocks.push(blockKarma(user));
      break;

    case "partner":
      blocks.push(blockPartner(user));
      break;

    case "compatibility":
      blocks.push(blockCompatibility(user));
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
