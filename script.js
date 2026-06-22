document.getElementById("reportForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const status = document.getElementById("status");
    status.textContent = "Создание отчёта... Пожалуйста, подождите.";

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("https://svetolada-backend.onrender.com/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.file_url) {
            // добавляем новый документ в список
            const list = document.getElementById("documents-list");
            const newItem = document.createElement("li");
            newItem.innerHTML = `<a href="${result.file_url}" target="_blank">${data.title}</a>`;
            list.appendChild(newItem);

            status.textContent = "Отчёт успешно создан!";
        } else {
            status.textContent = "Ошибка: сервер не вернул ссылку на файл.";
        }

    } catch (error) {
        status.textContent = "Ошибка соединения с сервером.";
    }
});

