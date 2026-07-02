// Главный совет дня
const mainTips = [
  "Сделай сегодня хотя бы одно маленькое действие, которое приблизит тебя к спокойствию.",
  "Поблагодари себя за то, что ты уже прошла. Ты сильнее, чем думаешь.",
  "Сделай вдох глубже обычного — и выдох чуть медленнее. Это уже забота о себе.",
  "Если что-то тревожит — запиши это. Записанное перестаёт давить.",
  "Сделай сегодня что-то приятное для тела: тёплый чай, мягкий плед, прогулка.",
];

// Мини‑советы по категориям
const categories = {
  health: [
    "Выпей стакан чистой воды — тело скажет спасибо.",
    "Сделай лёгкую растяжку шеи и плеч.",
    "Погуляй 10 минут — это улучшит настроение.",
  ],
  emotions: [
    "Разреши себе чувствовать то, что чувствуешь.",
    "Скажи себе: «Я имею право на отдых».",
    "Сделай паузу и спроси: «Что мне сейчас нужно?».",
  ],
  relationships: [
    "Скажи тёплое слово тому, кто рядом.",
    "Не спорь сегодня там, где можно улыбнуться.",
    "Помни: мягкость — это сила.",
  ],
  home: [
    "Убери одну маленькую вещь — порядок начнёт расти.",
    "Зажги свечу или включи мягкий свет.",
    "Проветри комнату — энергия обновится.",
  ],
  work: [
    "Сделай сначала самое маленькое дело — и день пойдёт легче.",
    "Сделай перерыв на 3 минуты — мозг перезагрузится.",
    "Не требуй от себя идеальности — требуй движения.",
  ],
  energy: [
    "Слушай музыку, которая поднимает настроение.",
    "Сделай три глубоких вдоха.",
    "Вспомни что-то хорошее из прошлого — это поднимет энергию.",
  ],
};

// Архив
const archiveList = document.getElementById("archive-list");

// Вывод главного совета
const mainTipEl = document.getElementById("main-tip");
function showRandomMainTip() {
  const tip = mainTips[Math.floor(Math.random() * mainTips.length)];
  mainTipEl.textContent = tip;

  // Добавляем в архив
  const li = document.createElement("li");
  li.textContent = `${new Date().toLocaleDateString()}: ${tip}`;
  archiveList.prepend(li);
}

// Кнопка «Хочу другой совет»
document
  .getElementById("new-tip-btn")
  .addEventListener("click", showRandomMainTip);

// Вывод мини‑советов
function fillCategory(id, tips) {
  const ul = document.getElementById(id);
  tips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    ul.appendChild(li);
  });
}

fillCategory("health-tips-list", categories.health);
fillCategory("emotion-tips-list", categories.emotions);
fillCategory("relationship-tips-list", categories.relationships);
fillCategory("home-tips-list", categories.home);
fillCategory("work-tips-list", categories.work);
fillCategory("energy-tips-list", categories.energy);

// Показываем первый совет при загрузке
showRandomMainTip();
