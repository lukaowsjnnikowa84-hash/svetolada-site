document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("svetolada_user"));
  const container = document.getElementById("result-sections");

  function addSection(label, value) {
    const div = document.createElement("div");
    div.className = "section";
    div.innerHTML = `
      <div class="label">${label}</div>
      <div class="value">${value}</div>
    `;
    container.appendChild(div);
  }

  function addHint(text) {
    const div = document.createElement("div");
    div.className = "section";
    div.style.borderLeft = "4px solid #6bb8ff";
    div.innerHTML = `
      <div class="label">Подсказка</div>
      <div class="value">${text}</div>
    `;
    container.appendChild(div);
  }

  // Основные данные пользователя
  addSection("Имя", data.name);
  addSection("Дата рождения", data.birthdate);

  // Время рождения — три варианта
  if (data.birthtime_exact) {
    addSection("Точное время рождения", data.birthtime_exact);
  } else if (data.birthtime_period) {
    const labels = {
      morning: "Утро",
      day: "День",
      evening: "Вечер",
      night: "Ночь",
    };

    addSection("Период рождения", labels[data.birthtime_period]);
    addHint("Анализ будет выполнен по выбранному периоду времени рождения.");
  } else {
    addSection("Время рождения", "не указано");
    addHint(
      "Разделы, связанные с точным временем рождения, будут отсутствовать.",
    );
  }

  addSection("Город рождения", data.birthplace || "не указано");

  // Партнёр
  if (data.partner_birthdate) {
    addSection("Дата рождения партнёра", data.partner_birthdate);
  } else {
    addSection("Идеальный партнёр", "Будет подобран автоматически ✨");
    addHint(
      "Поскольку дата рождения партнёра не указана, будет показан идеальный партнёр.",
    );
  }
});
