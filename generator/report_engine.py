import json
from templates import (
    numerology, astrology, aspects, jyotish, karma,
    soul_path, destiny, psychology, childhood, ayurveda,
    health, spiritual_practices, talents, profession,
    finances, love, family, compatibility, forecast
)


# ---------------------------------------------------------
#  Маппинг разделов → функций шаблонов
# ---------------------------------------------------------

SECTION_FUNCTIONS = {
    "Нумерология": numerology.get_numerology,
    "Астрология (Солнце — Луна — Асцендент)": astrology.get_astrology,
    "Аспекты": aspects.get_aspects,
    "Джйотиш": jyotish.get_jyotish,
    "Карма": karma.get_karma,
    "Путь души": soul_path.get_soul_path,
    "Предназначение": destiny.get_destiny,
    "Психология": psychology.get_psychology,
    "Детство": childhood.get_childhood,
    "Аюрведа": ayurveda.get_ayurveda,
    "Здоровье": health.get_health,
    "Духовные практики": spiritual_practices.get_spiritual_practices,
    "Таланты": talents.get_talents,
    "Профессия": profession.get_profession,
    "Финансы": finances.get_finances,
    "Любовь (Отношения)": love.get_love,
    "Семья": family.get_family,
    "Совместимость": compatibility.get_compatibility,
    "Прогноз": forecast.get_forecast,
}


# ---------------------------------------------------------
#  Основной генератор отчёта
# ---------------------------------------------------------

def generate_report_from_json(json_data):
    """
    Принимает JSON (словарь), возвращает полностью собранный отчёт.
    """

    user = json_data["user_data"]
    partner = json_data.get("partner", {"mode": "ideal"})

    age = user["age"]
    gender = user.get("gender", "female")  # если нет — по умолчанию
    has_time = user["time_accuracy"] == "exact"

    report = {
        "title": json_data["title"],
        "introduction": json_data["introduction"],
        "sections": [],
        "conclusion": json_data["conclusion"]
    }

    # -----------------------------------------------------
    #  Проходим по каждому разделу
    # -----------------------------------------------------

    for section in json_data["sections"]:
        title = section["title"]

        func = SECTION_FUNCTIONS.get(title)
        if not func:
            continue

        # Генерация текста раздела
        content = func(age, gender, has_time)

        # Добавляем данные партнёра в раздел совместимости
        if title == "Совместимость":
            content["partner"] = partner

        # Записываем в итоговый отчёт
        report["sections"].append({
            "id": section["id"],
            "block": section["block"],
            "title": title,
            "key": content["key"],
            "strengths": content["strengths"],
            "weaknesses": content["weaknesses"],
            "recommendations": content["recommendations"],
            "summary": content["summary"],
            "partner": content.get("partner")
        })

    return report


# ---------------------------------------------------------
#  Загрузка JSON из файла
# ---------------------------------------------------------

def load_json(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return json.load(f)
