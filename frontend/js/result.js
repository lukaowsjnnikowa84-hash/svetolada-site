/*  
    result.js
    Логика отображения анализа на странице result.html
*/

// Получение параметров из URL
function getUserDataFromURL() {
  const params = new URLSearchParams(window.location.search);

  return {
    name: params.get("name"),
    birthdate: params.get("birthdate"),
    partner: params.get("partner"),
  };
}

// Основной запуск
document.addEventListener("DOMContentLoaded", () => {
  const userData = getUserDataFromURL();

  // Генерация анализа
  const analysis = generateSvetoladaAnalysis(userData);

  // Сохранение в глобальную переменную
  window.svetoladaResult = analysis;

  // Подготовка полного отчёта
  renderFullReport(analysis);

  // Подготовка разделов
  renderSections(analysis);
});

/*  
    Полный отчёт
*/
function renderFullReport(analysis) {
  const fullTextBlock = document.getElementById("fullText");

  let html = "";

  for (let i = 1; i <= 27; i++) {
    html += `
            <h3 style="color:#B89C6A; font-family:'Playfair Display', serif; margin-top:30px;">
                ${analysis.sections[i].title}
            </h3>
            <p style="font-size:18px; line-height:1.6; color:#4A4A4A;">
                ${analysis.sections[i].text}
            </p>
        `;
  }

  fullTextBlock.innerHTML = html;
}

/*  
    Разделы по карточкам
*/
function renderSections(analysis) {
  const cards = document.querySelectorAll(".section-card");

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const sectionNumber = index + 1;
      openSection(sectionNumber, analysis);
    });
  });
}

/*  
    Открытие отдельного раздела
*/
function openSection(num, analysis) {
  const fullReport = document.getElementById("full-report");
  const sectionsBlock = document.getElementById("sections");
  const fullTextBlock = document.getElementById("fullText");

  fullReport.style.display = "block";
  sectionsBlock.style.display = "none";

  fullTextBlock.innerHTML = `
        <h3 style="color:#B89C6A; font-family:'Playfair Display', serif; margin-top:30px;">
            ${analysis.sections[num].title}
        </h3>
        <p style="font-size:18px; line-height:1.6; color:#4A4A4A;">
            ${analysis.sections[num].text}
        </p>
    `;
}

/*  
    Скачивание PDF
*/
function downloadPDF() {
  window.location.href = "download.html";
}
