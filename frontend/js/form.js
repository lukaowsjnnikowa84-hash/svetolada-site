document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("svetolada-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      name: form.name.value.trim(),
      birthdate: form.birthdate.value,
      birthtime: form.birthtime.value,

      birthplace: form.birthplace.value.trim(),
      birthtime_period: form.birthtime_period.value,
      // партнёр
      partner_birthdate: form.partner_birthdate.value.trim(),
    };

    localStorage.setItem("svetolada_user", JSON.stringify(data));

    window.location.href = "result.html";
  });
});
