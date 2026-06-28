# main.py — Светолада с красивым цветным меню и анимацией

import json
import os
import time
import sys
from backend.generate_json import generate_json
from backend.svetolada_pdf import generate_pdf
from backend.svetolada_texts import svetolada_texts
from config import DATA_PATH, PDF_PATH

import logging
from config import LOG_PATH

# ---------------------------------------------------------
#  Логирование
# ---------------------------------------------------------
logging.basicConfig(
    filename=LOG_PATH / "svetolada.log",
    level=logging.INFO,
    format="%(asctime)s — %(levelname)s — %(message)s",
    encoding="utf-8"
)
# Логирование ошибок в отдельный файл
error_logger = logging.getLogger("errors")
error_handler = logging.FileHandler(LOG_PATH / "errors.log", encoding="utf-8")
error_handler.setLevel(logging.ERROR)
error_formatter = logging.Formatter("%(asctime)s — %(levelname)s — %(message)s")
error_handler.setFormatter(error_formatter)
error_logger.addHandler(error_handler)

# ---------------------------------------------------------
#  Цвета для консоли
# ---------------------------------------------------------
class C:
    HEADER = "\033[95m"
    PINK = "\033[38;5;218m"
    GOLD = "\033[38;5;222m"
    BEIGE = "\033[38;5;180m"
    OK = "\033[92m"
    BLUE = "\033[94m"
    RESET = "\033[0m"
    BOLD = "\033[1m"


# ---------------------------------------------------------
#  Анимация «создаём магию»
# ---------------------------------------------------------
def magic_animation(text="✨ создаём магию"):
    dots = ["", ".", "..", "...", "....", "....."]
    for i in range(12):
        sys.stdout.write(f"\r{text}{dots[i % len(dots)]}")
        sys.stdout.flush()
        time.sleep(0.25)
    print("\r" + " " * 40 + "\r", end="")


# ---------------------------------------------------------
#  Сборка текста отчёта
# ---------------------------------------------------------
def build_report_text(data):
    user = data["user_data"]

    ctx = {
        "name": user["name"],
        "birth_date": user["birth_date"],
        "birth_day": user["birth_day"],
        "life_path": user["life_path"],
        "soul": user["soul"],
        "personality": user["personality"],
        "destiny": user["destiny"],
        "maturity": user["maturity"],
        "birth_code": user["birth_code"],
        "month_energy": user["month_energy"],
        "year_energy": user["year_energy"],
        "shadow": user["shadow"],
        "karma": user["karma"],
        "mission": user["mission"],
        "gift": user["gift"],
        "talent": user["talent"],
        "name_vibration": user["name_vibration"],
        "full_name_number": user["full_name_number"],
    }

    blocks = []
    blocks.append(svetolada_texts["introduction"].format(**ctx))

    for i in range(1, 20):
        key = f"section{i}"
        if key in svetolada_texts:
            blocks.append(f"{i}. {svetolada_texts[key].format(**ctx)}")

    blocks.append(svetolada_texts["conclusion"].format(**ctx))

    return "\n\n".join(blocks)


# ---------------------------------------------------------
#  Загрузка JSON
# ---------------------------------------------------------
def load_json(filename):
    path = DATA_PATH / filename
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


# ---------------------------------------------------------
#  Генерация PDF из JSON
# ---------------------------------------------------------
def create_pdf_from_json(filename):
    data = load_json(filename)
    report_text = build_report_text(data)

    output_file = filename.replace(".json", ".pdf")

    print(f"\n{C.GOLD}", end="")
    magic_animation("✨ создаём магию")
    print(C.RESET, end="")

    generate_pdf(
        report_text=report_text,
        name=data["user_data"]["name"],
        birth_date=data["user_data"]["birth_date"],
        place=data["user_data"]["birth_place"],
        time=data["user_data"]["birth_time"],
        partner=data.get("partner"),
        filename=output_file,
        conclusion_variant="A"
    )

    print(f"\n{C.OK}✔ PDF создан: {PDF_PATH / output_file}{C.RESET}\n")


# ---------------------------------------------------------
#  Красивое цветное меню
# ---------------------------------------------------------
def menu():
    while True:
        print(f"""
{C.PINK}{C.BOLD}╔══════════════════════════════════════════════╗
║                С В Е Т О Л А Д А               ║
╚══════════════════════════════════════════════╝{C.RESET}

{C.GOLD}Выберите действие:{C.RESET}

{C.BEIGE}1 — Создать новый отчёт (ввод данных)
2 — Создать PDF из example.json
3 — Создать PDF из example_full.json
4 — Показать список JSON в папке data
5 — Показать список PDF в папке output
6 — Создать PDF из выбранного JSON
0 — Выход{C.RESET}
""")

        choice = input(f"{C.PINK}Ваш выбор: {C.RESET}").strip()

        if choice == "1":
            json_filename = generate_json()
            create_pdf_from_json(json_filename)

        elif choice == "2":
            create_pdf_from_json("example.json")

        elif choice == "3":
            create_pdf_from_json("example_full.json")

        elif choice == "4":
            print(f"\n{C.GOLD}📁 Файлы в data/:{C.RESET}")
            for f in os.listdir(DATA_PATH):
                print("—", f)

        elif choice == "5":
            print(f"\n{C.GOLD}📁 Файлы в output/:{C.RESET}")
            for f in os.listdir(PDF_PATH):
                print("—", f)

        elif choice == "6":
            filename = input("Введите имя JSON-файла: ").strip()
            create_pdf_from_json(filename)

        elif choice == "0":
            print(f"\n{C.PINK}🌷 До встречи, светлая душа.{C.RESET}\n")
            break

        else:
            print(f"\n{C.GOLD}⚠ Неверный выбор. Попробуйте снова.{C.RESET}\n")


# ---------------------------------------------------------
#  Запуск
# ---------------------------------------------------------
if __name__ == "__main__":
    menu()




