document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("svetolada_result"));

  if (!data) {
    document.getElementById("result-sections").innerHTML =
      "<p>Ошибка: данные не найдены.</p>";
    return;
  }

  window.generatedUserData = {
    name: data.name,
    birthdate: data.birthdate,
    birthtime: data.birthtime,
    birthplace: data.birthplace,

    // твои числовые данные
    lifePath: data.destiny_number,
    soul: data.soul_number || "",
    personality: data.personality_number || "",
    destiny: data.destiny_number || "",
    maturity: data.maturity_number || "",
    karma: data.karma || "",
    talent: data.talent || "",
    mission: data.mission || "",
    shadow: data.shadow || "",
    gift: data.gift || "",
    yearEnergy: data.year_energy || "",
    monthEnergy: data.month_energy || "",
  };

  const container = document.getElementById("result-sections");

  function addSection(title, text) {
    const block = document.createElement("div");
    block.className = "section";

    block.innerHTML = `
      <div class="label">${title}</div>
      <div class="value">${text}</div>
    `;

    container.appendChild(block);
  }

  addSection("Ваше имя", data.name);
  addSection("Дата рождения", data.birthdate);
  addSection("Время рождения", data.birthtime);
  addSection("Город рождения", data.birthplace);

  addSection("Стихия", data.element);
  addSection("Число судьбы", data.destiny_number);
  addSection("Описание личности", data.personality);
  addSection("Советы", data.advice);
});

// --------------------------------------
//   НОВАЯ ФУНКЦИЯ СКАЧИВАНИЯ PDF
// --------------------------------------
function downloadPDF() {
  const userData = window.generatedUserData;
  const texts = SVETOLADA_TEXTS;

  // вызываем PDF-движок
  window.downloadPDF(userData, texts);
}
