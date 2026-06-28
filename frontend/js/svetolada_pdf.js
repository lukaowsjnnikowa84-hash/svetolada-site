// ===============================
//   SVETOLADA PDF GENERATOR
// ===============================

// Палитра Светолады
const COLORS = {
  gold: "#B89C6A", // тёплое золото
  text: "#5A4A3A", // тёплый тёмно-коричневый
  black: "#333333",
};

// Отступы
const MARGIN = {
  left: 40,
  right: 40,
  top: 50,
  bottom: 50,
};

// --------------------------------
//   Создание документа
// --------------------------------
function createDocument() {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
    compress: true,
  });

  doc.setFont("Helvetica", "normal");
  return doc;
}

// --------------------------------
//   Титульная страница
// --------------------------------
function addTitlePage(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Фон-туман
  doc.addImage(
    "/generator/resources/cover.png",
    "PNG",
    0,
    0,
    pageWidth,
    pageHeight,
  );

  // Логотип
  doc.addImage(
    "/generator/resources/logo.png",
    "PNG",
    pageWidth / 2 - 70,
    120,
    140,
    140,
  );

  // Уголки
  doc.addImage("/generator/resources/corner.png", "PNG", 40, 40, 60, 60);
  doc.addImage(
    "/generator/resources/corner.png",
    "PNG",
    pageWidth - 100,
    40,
    60,
    60,
  );

  // Разделитель
  doc.addImage(
    "/generator/resources/divider.png",
    "PNG",
    pageWidth / 2 - 100,
    300,
    200,
    30,
  );

  // Название
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(COLORS.gold);
  doc.text("Индивидуальный анализ Светолада", pageWidth / 2, 370, {
    align: "center",
  });

  // Подзаголовок
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(COLORS.text);
  doc.text(
    "Глубокий личный разбор вибраций, пути души и предназначения",
    pageWidth / 2,
    405,
    { align: "center" },
  );

  doc.addPage();
}

// --------------------------------
//   Страница данных пользователя
// --------------------------------
function addUserDataPage(doc, userData) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const startX = MARGIN.left;
  let y = MARGIN.top;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(COLORS.gold);
  doc.text("Персональные данные", pageWidth / 2, y, { align: "center" });
  y += 18;

  doc.setDrawColor(COLORS.gold);
  doc.setLineWidth(1.2);
  doc.line(pageWidth * 0.1, y, pageWidth * 0.9, y);
  y += 30;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(COLORS.text);

  const fields = [
    ["Имя", userData.name],
    ["Дата рождения", userData.birthdate],
    ["Путь жизни", userData.lifePath],
    ["Число души", userData.soul],
    ["Число личности", userData.personality],
    ["Число судьбы", userData.destiny],
    ["Число зрелости", userData.maturity],
    ["Карма", userData.karma],
    ["Талант", userData.talent],
    ["Миссия", userData.mission],
    ["Тень", userData.shadow],
    ["Дар", userData.gift],
    ["Энергия года", userData.yearEnergy],
    ["Энергия месяца", userData.monthEnergy],
  ];

  fields.forEach(([label, value]) => {
    doc.setFont("Helvetica", "bold");
    doc.text(`${label}:`, startX, y);

    doc.setFont("Helvetica", "normal");
    doc.text(`${value}`, startX + 160, y);

    y += 22;
  });

  doc.addPage();
}

// --------------------------------
//   Заголовок блока
// --------------------------------
function addBlockHeader(doc, title) {
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = MARGIN.top;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(COLORS.gold);
  doc.text(title, pageWidth / 2, y, { align: "center" });
  y += 16;

  doc.setDrawColor(COLORS.gold);
  doc.setLineWidth(1.2);
  doc.line(pageWidth * 0.1, y, pageWidth * 0.9, y);

  return y + 30;
}

// --------------------------------
//   Заголовок раздела
// --------------------------------
function addSectionHeader(doc, title, startY) {
  const startX = MARGIN.left;
  let y = startY;

  doc.setDrawColor(COLORS.gold);
  doc.setLineWidth(1);
  doc.line(startX, y, startX + 22, y);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(COLORS.gold);
  doc.text(title, startX + 30, y + 5);

  return y + 25;
}

// --------------------------------
//   Текст раздела
// --------------------------------
function addSectionText(doc, text, startY) {
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth =
    doc.internal.pageSize.getWidth() - MARGIN.left - MARGIN.right;
  let y = startY;

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(COLORS.text);

  const lines = doc.splitTextToSize(text, maxWidth);

  lines.forEach((line) => {
    if (y > pageHeight - MARGIN.bottom) {
      doc.addPage();
      y = MARGIN.top;
    }
    doc.text(line, MARGIN.left, y);
    y += 18;
  });

  return y + 10;
}

// --------------------------------
//   Генерация всех блоков
// --------------------------------
function addAllBlocks(doc, texts) {
  let y;

  // БЛОК I
  y = addBlockHeader(doc, "Блок I. Основные вибрации личности");
  y = addSectionHeader(doc, "Нумерология", y);
  y = addSectionText(doc, texts.numerology, y);

  y = addSectionHeader(doc, "Астрология (Солнце — Луна — Асцендент)", y);
  y = addSectionText(doc, texts.astrology, y);

  y = addSectionHeader(doc, "Аспекты", y);
  y = addSectionText(doc, texts.aspects, y);

  y = addSectionHeader(doc, "Джйотиш", y);
  y = addSectionText(doc, texts.jyotish, y);

  doc.addPage();

  // БЛОК II
  y = addBlockHeader(doc, "Блок II. Карма и путь души");
  y = addSectionHeader(doc, "Карма", y);
  y = addSectionText(doc, texts.karma, y);

  y = addSectionHeader(doc, "Путь души", y);
  y = addSectionText(doc, texts.soulPath, y);

  y = addSectionHeader(doc, "Предназначение", y);
  y = addSectionText(doc, texts.purpose, y);

  doc.addPage();

  // БЛОК III
  y = addBlockHeader(doc, "Блок III. Психология и внутренний мир");
  y = addSectionHeader(doc, "Психология", y);
  y = addSectionText(doc, texts.psychology, y);

  y = addSectionHeader(doc, "Детство", y);
  y = addSectionText(doc, texts.childhood, y);

  doc.addPage();

  // БЛОК IV
  y = addBlockHeader(doc, "Блок IV. Тело, энергия, здоровье");
  y = addSectionHeader(doc, "Аюрведа", y);
  y = addSectionText(doc, texts.ayurveda, y);

  y = addSectionHeader(doc, "Здоровье", y);
  y = addSectionText(doc, texts.health, y);

  y = addSectionHeader(doc, "Духовные практики", y);
  y = addSectionText(doc, texts.spiritual, y);

  doc.addPage();

  // БЛОК V
  y = addBlockHeader(doc, "Блок V. Реализация в мире");
  y = addSectionHeader(doc, "Таланты", y);
  y = addSectionText(doc, texts.talents, y);

  y = addSectionHeader(doc, "Профессия", y);
  y = addSectionText(doc, texts.profession, y);

  y = addSectionHeader(doc, "Финансы", y);
  y = addSectionText(doc, texts.money, y);

  doc.addPage();

  // БЛОК VI
  y = addBlockHeader(doc, "Блок VI. Отношения и семья");
  y = addSectionHeader(doc, "Любовь", y);
  y = addSectionText(doc, texts.love, y);

  y = addSectionHeader(doc, "Семья", y);
  y = addSectionText(doc, texts.family, y);

  y = addSectionHeader(doc, "Совместимость", y);
  y = addSectionText(doc, texts.compatibility, y);

  doc.addPage();

  // БЛОК VII
  y = addBlockHeader(doc, "Блок VII. Время и вывод");
  y = addSectionHeader(doc, "Прогноз", y);
  y = addSectionText(doc, texts.forecast, y);

  y = addSectionHeader(doc, "Заключение", y);
  y = addSectionText(doc, texts.conclusion, y);
}

// --------------------------------
//   Финальная функция
// --------------------------------
function downloadPDF(userData, texts) {
  const doc = createDocument();
  addTitlePage(doc);
  addUserDataPage(doc, userData);
  addAllBlocks(doc, texts);
  doc.save(`Svetolada_${userData.name}.pdf`);
}
