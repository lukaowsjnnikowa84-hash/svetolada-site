# numerology.py
# Нумерологические расчёты для проекта Светолада

# ---------------------------------------------------------
#  Универсальная функция сведения числа
# ---------------------------------------------------------

def reduce_number(n):
    """Сводит число к однозначному, кроме 11, 22, 33."""
    while n > 9 and n not in (11, 22, 33):
        n = sum(int(d) for d in str(n))
    return n


# ---------------------------------------------------------
#  ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ИМЕНИ
# ---------------------------------------------------------

# Пифагорейская система для букв (упрощённая, но единая)
LETTER_MAP = {
    "А":1, "Б":2, "В":3, "Г":4, "Д":5, "Е":6, "Ё":7, "Ж":8, "З":9,
    "И":1, "Й":2, "К":3, "Л":4, "М":5, "Н":6, "О":7, "П":8, "Р":9,
    "С":1, "Т":2, "У":3, "Ф":4, "Х":5, "Ц":6, "Ч":7, "Ш":8, "Щ":9,
    "Ъ":0, "Ы":1, "Ь":0, "Э":6, "Ю":7, "Я":6,

    "A":1, "B":2, "C":3, "D":4, "E":5, "F":6, "G":7, "H":8, "I":9,
    "J":1, "K":2, "L":3, "M":4, "N":5, "O":6, "P":7, "Q":8, "R":9,
    "S":1, "T":2, "U":3, "V":4, "W":5, "X":6, "Y":7, "Z":8
}

VOWELS = set("АЕЁИОУЫЭЮЯAEIOUY")
CONSONANTS = set(LETTER_MAP.keys()) - VOWELS


def name_to_numbers(name):
    """Преобразует имя в список чисел по буквам."""
    nums = []
    for ch in name.upper():
        if ch in LETTER_MAP:
            nums.append(LETTER_MAP[ch])
    return nums


# ---------------------------------------------------------
#  ЧИСЛО СУДЬБЫ (LIFE PATH)
# ---------------------------------------------------------

def calculate_life_path(birth_date):
    """
    Число судьбы (Life Path)
    birth_date: строка 'DD.MM.YYYY'
    """
    digits = [int(d) for d in birth_date if d.isdigit()]
    total = sum(digits)
    return reduce_number(total)


# ---------------------------------------------------------
#  ЧИСЛО ДУШИ (SOUL NUMBER)
# ---------------------------------------------------------

def calculate_soul(name):
    """
    Число души — сумма гласных букв имени.
    """
    total = 0
    for ch in name.upper():
        if ch in VOWELS and ch in LETTER_MAP:
            total += LETTER_MAP[ch]
    return reduce_number(total)


# ---------------------------------------------------------
#  ЧИСЛО ЛИЧНОСТИ (PERSONALITY NUMBER)
# ---------------------------------------------------------

def calculate_personality(name):
    """
    Число личности — сумма согласных букв имени.
    """
    total = 0
    for ch in name.upper():
        if ch in CONSONANTS and ch in LETTER_MAP:
            total += LETTER_MAP[ch]
    return reduce_number(total)


# ---------------------------------------------------------
#  ЧИСЛО ПРЕДНАЗНАЧЕНИЯ (DESTINY NUMBER)
# ---------------------------------------------------------

def calculate_destiny(name):
    """
    Число предназначения — сумма всех букв полного имени.
    """
    nums = name_to_numbers(name)
    total = sum(nums)
    return reduce_number(total)


# ---------------------------------------------------------
#  ЧИСЛО ЗРЕЛОСТИ (MATURITY NUMBER)
# ---------------------------------------------------------

def calculate_maturity(life_path, destiny):
    """
    Число зрелости — сумма судьбы и предназначения.
    """
    return reduce_number(life_path + destiny)


# ---------------------------------------------------------
#  КОД ДАТЫ РОЖДЕНИЯ (BIRTH CODE)
# ---------------------------------------------------------

def calculate_birth_code(birth_date):
    """
    Код даты рождения — сведение дня+месяца+года.
    """
    digits = [int(d) for d in birth_date if d.isdigit()]
    total = sum(digits)
    return reduce_number(total)


# ---------------------------------------------------------
#  ЭНЕРГИЯ МЕСЯЦА (MONTH ENERGY)
# ---------------------------------------------------------

def calculate_month_energy(birth_date):
    """
    Энергия месяца рождения — сведение номера месяца.
    """
    day, month, year = birth_date.split(".")
    month_num = int(month)
    return reduce_number(month_num)


# ---------------------------------------------------------
#  ЭНЕРГИЯ ГОДА (YEAR ENERGY)
# ---------------------------------------------------------

def calculate_year_energy(birth_date):
    """
    Энергия года рождения — сведение года.
    """
    day, month, year = birth_date.split(".")
    digits = [int(d) for d in year if d.isdigit()]
    total = sum(digits)
    return reduce_number(total)


# ---------------------------------------------------------
#  ЧИСЛО ТЕНИ (SHADOW NUMBER)
# ---------------------------------------------------------

def calculate_shadow(life_path):
    """
    Число тени — условно: 9 - life_path (сведённое).
    """
    base = 9 - (life_path if life_path <= 9 else reduce_number(life_path))
    if base <= 0:
        base = 9
    return reduce_number(base)


# ---------------------------------------------------------
#  ДАР (GIFT NUMBER)
# ---------------------------------------------------------

def calculate_gift(life_path, soul):
    """
    Дар — сочетание судьбы и души.
    """
    return reduce_number(life_path + soul)


# ---------------------------------------------------------
#  МИССИЯ (MISSION NUMBER)
# ---------------------------------------------------------

def calculate_mission(destiny, karma):
    """
    Миссия — сочетание предназначения и кармы.
    """
    return reduce_number(destiny + karma)


# ---------------------------------------------------------
#  КАРМА (KARMA NUMBER)
# ---------------------------------------------------------

def calculate_karma(birth_code, destiny):
    """
    Карма — сочетание кода даты и предназначения.
    """
    return reduce_number(birth_code + destiny)


# ---------------------------------------------------------
#  ТАЛАНТ (TALENT NUMBER)
# ---------------------------------------------------------

def calculate_talent(soul, personality):
    """
    Талант — сочетание души и личности.
    """
    return reduce_number(soul + personality)


# ---------------------------------------------------------
#  ВИБРАЦИЯ ИМЕНИ (NAME VIBRATION)
# ---------------------------------------------------------

def calculate_name_vibration(name):
    """
    Вибрация имени — сведение суммы всех букв.
    """
    nums = name_to_numbers(name)
    total = sum(nums)
    return reduce_number(total)


# ---------------------------------------------------------
#  ЧИСЛО ПОЛНОГО ИМЕНИ (FULL NAME NUMBER)
# ---------------------------------------------------------

def calculate_full_name_number(name):
    """
    Число полного имени — то же, что предназначение,
    но оставляем как отдельный ключ для текстов.
    """
    return calculate_destiny(name)
