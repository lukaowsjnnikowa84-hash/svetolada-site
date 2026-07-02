# backend/app.py

from flask import Flask
from flask_cors import CORS
import os
import logging

# Маршруты
from routes.generate_pdf import generate_pdf_bp

def create_app():
    app = Flask(__name__)

    # Разрешаем запросы с фронтенда
    CORS(app)

    # Подключаем маршруты
    app.register_blueprint(generate_pdf_bp)

    # Создаём папку pdf, если её нет
    if not os.path.exists("pdf"):
        os.makedirs("pdf")
        print("Создан каталог pdf/")

    # Логирование
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
        handlers=[
            logging.FileHandler("backend.log"),
            logging.StreamHandler()
        ]
    )

    logging.info("Сервер Светолада запущен")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
