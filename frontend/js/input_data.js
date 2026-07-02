document.addEventListener("DOMContentLoaded", () => {
  const timeType = document.getElementById("user-time-type");
  const exactBlock = document.getElementById("user-time-exact-block");
  const approxBlock = document.getElementById("user-time-approx-block");

  function updateTimeFields() {
    exactBlock.style.display = timeType.value === "exact" ? "block" : "none";
    approxBlock.style.display = timeType.value === "approx" ? "block" : "none";
  }

  updateTimeFields();
  timeType.addEventListener("change", updateTimeFields);

  document
    .getElementById("start-analysis-btn")
    .addEventListener("click", () => {
      // показываем прогресс
      const progressBlock = document.getElementById("progress-block");
      const progressFill = document.querySelector(".progress-fill");

      progressBlock.style.display = "block";
      progressFill.style.width = "100%";

      // собираем данные
      const data = {
        user: {
          name: document.getElementById("user-name").value,
          birthdate: document.getElementById("user-birthdate").value,
          timeType: document.getElementById("user-time-type").value,
          timeExact: document.getElementById("user-time-exact").value,
          timeApprox: document.getElementById("user-time-approx").value,
          birthplace: document.getElementById("user-birthplace").value,
        },
        partner: {
          name: document.getElementById("partner-name").value,
          birthdate: document.getElementById("partner-birthdate").value,
          time: document.getElementById("partner-time").value,
          birthplace: document.getElementById("partner-birthplace").value,
        },
      };

      // сохраняем
      localStorage.setItem("svetolada_input", JSON.stringify(data));

      // имитация анализа
      setTimeout(() => {
        window.location.href = "analysis_preview.html";
      }, 3000);
    });
});
