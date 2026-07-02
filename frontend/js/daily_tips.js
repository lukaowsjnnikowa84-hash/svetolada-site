// --- МАССИВЫ СОВЕТОВ ---

const mainTips = [
  "Сегодня лучше не спешить. Дай себе 10 минут тишины перед началом дел.",
  "Сделай что-то маленькое, но приятное для себя — это изменит весь день.",
  "Не перегружай себя. Одно важное дело — лучше, чем пять незавершённых.",
  "Пей больше воды — мозг работает яснее.",
  "Сделай короткую прогулку — даже 5 минут дадут энергию.",
  "Не сравнивай себя с другими. Ты идёшь своим путём.",
  "Сохрани спокойствие — оно твоя сила сегодня.",
  "Сделай паузу перед важным разговором — она даст мудрость.",
  "Улыбнись себе в зеркало — это работает.",
  "Сегодня хорошо подходит для мягких решений, а не резких шагов.",
];

const healthTips = [
  "Выпей стакан тёплой воды утром.",
  "Сделай лёгкую растяжку шеи.",
  "Добавь один овощ в рацион.",
  "Пройди хотя бы 500 шагов.",
  "Сделай глубокий вдох 5 раз.",
];

const emotionTips = [
  "Назови вслух своё чувство — оно станет легче.",
  "Сделай паузу перед реакцией.",
  "Обними себя за плечи — это успокаивает.",
  "Слушай музыку, которая тебя поддерживает.",
  "Запиши одну мысль, которая тревожит.",
];

const relationshipTips = [
  "Скажи кому-то тёплое слово.",
  "Не спорь сегодня — выбери мягкость.",
  "Напомни близкому, что он важен.",
  "Сделай маленький жест внимания.",
  "Не принимай всё на свой счёт.",
];

const homeTips = [
  "Убери один маленький угол.",
  "Зажги свечу — атмосфера меняет состояние.",
  "Проветри комнату.",
  "Сложи вещи на столе.",
  "Добавь что-то красивое в пространство.",
];

const workTips = [
  "Сделай одно дело полностью.",
  "Поставь таймер на 20 минут.",
  "Сделай перерыв каждые 90 минут.",
  "Не бери на себя лишнее.",
  "Сначала — самое простое действие.",
];

const energyTips = [
  "Сделай три глубоких вдоха.",
  "Посмотри на небо — это успокаивает.",
  "Сменить позу — сменить состояние.",
  "Сделай маленькую прогулку.",
  "Поставь любимую музыку.",
];

// --- СОВЕТ ДНЯ ПО ДАТЕ ---

function getTipOfTheDay() {
  const today = new Date();
  const index = today.getDate() % mainTips.length;
  return mainTips[index];
}

// --- ЗАПОЛНЕНИЕ КАТЕГОРИЙ ---

function fillCategory(listId, tipsArray) {
  const ul = document.getElementById(listId);
  ul.innerHTML = "";
  tipsArray.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    ul.appendChild(li);
  });
}

// --- АРХИВ (localStorage) ---

function saveTipToArchive(tip) {
  const today = new Date().toLocaleDateString("ru-RU");
  const archive = JSON.parse(localStorage.getItem("dailyTipsArchive") || "{}");

  archive[today] = tip;
  localStorage.setItem("dailyTipsArchive", JSON.stringify(archive));
}

function loadArchive() {
  const archive = JSON.parse(localStorage.getItem("dailyTipsArchive") || "{}");
  const ul = document.getElementById("archive-list");

  ul.innerHTML = "";

  Object.keys(archive).forEach((date) => {
    const li = document.createElement("li");
    li.textContent = `${date}: ${archive[date]}`;
    ul.appendChild(li);
  });
}

// --- КНОПКА "ХОЧУ ДРУГОЙ СОВЕТ" ---

function setRandomTip() {
  const randomIndex = Math.floor(Math.random() * mainTips.length);
  const tip = mainTips[randomIndex];

  document.getElementById("main-tip").textContent = tip;
  saveTipToArchive(tip);
  loadArchive();
}

// --- ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ ---

document.addEventListener("DOMContentLoaded", () => {
  const tip = getTipOfTheDay();
  document.getElementById("main-tip").textContent = tip;
  saveTipToArchive(tip);

  fillCategory("health-tips-list", healthTips);
  fillCategory("emotion-tips-list", emotionTips);
  fillCategory("relationship-tips-list", relationshipTips);
  fillCategory("home-tips-list", homeTips);
  fillCategory("work-tips-list", workTips);
  fillCategory("energy-tips-list", energyTips);

  loadArchive();

  document
    .getElementById("new-tip-btn")
    .addEventListener("click", setRandomTip);
});
