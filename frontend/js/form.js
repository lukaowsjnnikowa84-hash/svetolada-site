document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("svetolada-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      name: form.name.value.trim(),
      birthdate: form.birthdate.value,

      birthtime_exact: form.birthtime_exact.value.trim(),
      birthtime_period: form.birthtime_period.value,

      birthplace: form.birthplace.value.trim(),

      partner_birthdate: form.partner_birthdate.value.trim(),
    };

    localStorage.setItem("svetolada_user", JSON.stringify(data));

    window.location.href = "result.html";
  });
});
