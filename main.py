import json
from generator.report_engine import generate_report_from_json
from generator.pdf_engine import generate_pdf
from generate_json import generate_json


def main():
    print("Добро пожаловать в систему Светолада!\n")

    # 1. Создаём JSON-файл с данными
    print("Шаг 1: ввод данных и создание JSON...\n")
    generate_json()  # создаёт файл svetolada_ДД-ММ-ГГГГ.json

    # 2. Определяем имя файла JSON
    birth_date = input("\nВведите дату рождения ещё раз, чтобы открыть JSON (01.01.1990): ").strip()
    json_filename = f"svetolada_{birth_date.replace('.', '-')}.json"

    # 3. Загружаем JSON
    print("\nШаг 2: загрузка JSON...")
    with open(json_filename, "r", encoding="utf-8") as f:
        json_data = json.load(f)

    # 4. Генерируем текстовый отчёт
    print("Шаг 3: генерация текстового отчёта...")
    report = generate_report_from_json(json_data)

    # 5. Создаём PDF
    print("Шаг 4: создание PDF...")
    pdf_filename = f"svetolada_report_{birth_date.replace('.', '-')}.pdf"
    generate_pdf(report, pdf_filename)

    print(f"\nГотово! Ваш PDF создан: {pdf_filename}")


if __name__ == "__main__":
    main()

