/*  
    svetolada_pdf.js
    Логика запроса PDF у backend (Flask)
*/

async function requestPDF(userData) {
  try {
    const response = await fetch("/generate_pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (result.status === "ok") {
      // Сохраняем путь к PDF
      localStorage.setItem("svetolada_pdf_path", result.pdf_path);

      // Переход на страницу скачивания
      window.location.href = "download.html";
    } else {
      alert("Ошибка при генерации PDF. Попробуйте позже.");
    }
  } catch (error) {
    console.error("PDF error:", error);
    alert("Ошибка соединения с сервером.");
  }
}
