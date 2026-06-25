import json
import datetime

# ---------------------------------------------------------
#  Преобразование чисел в слова (утро/день/вечер/ночь)
# ---------------------------------------------------------

def normalize_time_input(birth_time):
    mapping = {
        "1": "утро",
        "2": "день",
        "3": "вечер",
        "4": "ночь"
    }
    return mapping.get(birth_time, birth_time)


# ---------------------------------------------------------
#  Определение точности времени рождения
# ---------------------------------------------------------

def detect_time_accuracy(birth_time):
    if not birth_time or birth_time.strip() == "":
        return "unknown"

    birth_time = birth_time.lower().strip()

    if birth_time in ["утро", "день", "вечер", "ночь"]:
        return "range"

    if "-" in birth_time:
        return "interval"

    try:
        datetime.datetime.strptime(birth_time, "%H:%M")
        return "exact"
    except:
        return "unknown"


# ---------------------------------------------------------
#  Определение возраста
# ---------------------------------------------------------

def calculate_age(birth_date_str):
    birth_date = datetime.datetime.strptime(birth_date_str, "%d.%m.%Y")
    today = datetime.datetime.now()
    age = today.year - birth_date.year - (
        (today.month, today.day) < (birth_date.month, birth_date.day)
    )
    return age


# ---------------------------------------------------------
#  Создание структуры разделов
# ---------------------------------------------------------

def create_sections():
    titles = [
        ("Основные вибрации личности", "Нумерология"),
        ("Основные вибрации личности", "Астрология (Солнце — Луна — Асцендент)"),
        ("Основные вибрации личности", "Аспекты"),
        ("Основные вибрации личности", "Джйотиш"),
        ("Карма и путь души", "Карма"),
        ("Карма и путь души", "Путь души"),
        ("Карма и путь души", "Предназначение"),
        ("Психология и внутренний мир", "Психология"),
        ("Психология и внутренний мир", "Детство"),
        ("Тело, энергия, здоровье", "Аюрведа"),
        ("Тело, энергия, здоровье", "Здоровье"),
        ("Тело, энергия, здоровье", "Духовные практики"),
        ("Реализация в мире", "Таланты"),
        ("Реализация в мире", "Профессия"),
        ("Реализация в мире", "Финансы"),
        ("Отношения и семья", "Любовь (Отношения)"),
        ("Отношения и семья", "Семья"),
        ("Отношения и семья", "Совместимость"),
        ("Время и вывод", "Прогноз")
    ]

    sections = []
    for i, (block, title) in enumerate(titles, start=1):
        sections.append({
            "id": i,
            "block": block,
            "title": title,
            "key": {},
            "strengths": {},
            "weaknesses": {},
            "recommendations": {},
            "summary": {}
        })

    return sections


# ---------------------------------------------------------
#  Генерация JSON
# ---------------------------------------------------------

def generate_json():
    print("Создание JSON для отчёта Светолада\n")

    # -----------------------------
    # ДАННЫЕ ОСНОВНОГО ЧЕЛОВЕКА
    # -----------------------------
    birth_date = input("Введите дату рождения (например 01.01.1990): ").strip()

    print("\nВведите время рождения:")
    print("""
Вы можете указать:
• точное время — например: 12:45
• примерный период — утро / день / вечер / ночь
• числом — 1 (утро), 2 (день), 3 (вечер), 4 (ночь)
• интервал — например: 06:00-11:00
• или оставьте пустым, если время неизвестно
""")

    birth_time_raw = input("Ваш ввод: ").strip()
    birth_time = normalize_time_input(birth_time_raw)
    time_accuracy = detect_time_accuracy(birth_time)

    birth_place = input("\nВведите место рождения (в свободной форме): ").strip()

    age = calculate_age(birth_date)

    # -----------------------------
    # ДАННЫЕ ПАРТНЁРА
    # -----------------------------
    print("\nЕсть ли данные партнёра?")
    has_partner = input("Введите 'да' или 'нет': ").strip().lower()

    if has_partner == "да":
        p_birth_date = input("\nДата рождения партнёра (например 01.01.1990): ").strip()

        print("\nВведите время рождения партнёра:")
        print("""
• точное время — 12:45
• утро / день / вечер / ночь
• 1 / 2 / 3 / 4
• интервал — 06:00-11:00
• или пусто
""")

        p_birth_time_raw = input("Ваш ввод: ").strip()
        p_birth_time = normalize_time_input(p_birth_time_raw)
        p_time_accuracy = detect_time_accuracy(p_birth_time)

        p_birth_place = input("\nВведите место рождения партнёра: ").strip()

        p_age = calculate_age(p_birth_date)

        partner_data = {
            "birth_date": p_birth_date,
            "birth_time": p_birth_time if p_birth_time else None,
            "birth_place": p_birth_place,
            "age": p_age,
            "time_accuracy": p_time_accuracy,
            "mode": "full" if p_time_accuracy == "exact" else "medium"
        }

    else:
        partner_data = {
            "mode": "ideal"
        }

    # -----------------------------
    # ФОРМИРОВАНИЕ ИТОГОВОГО JSON
    # -----------------------------

    data = {
        "user_data": {
            "birth_date": birth_date,
            "birth_time": birth_time if birth_time else None,
            "birth_place": birth_place,
            "age": age,
            "time_accuracy": time_accuracy
        },

        "partner": partner_data,

        "title": "Отчёт Светолада",

        "introduction": "Это мягкое, спокойное введение, которое настраивает читателя на документ.",

        "sections": create_sections(),

        "conclusion": "Финальный вывод отчёта Светолада."
    }

    filename = f"svetolada_{birth_date.replace('.', '-')}.json"

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\nJSON успешно создан: {filename}")


# ---------------------------------------------------------
#  MAIN
# ---------------------------------------------------------

if __name__ == "__main__":
    generate_json()


