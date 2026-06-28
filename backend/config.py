import os

# Корневая папка backend
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Папка с текстами Светолады
TEXTS_DIR = os.path.join(BASE_DIR, "models")

# Папка с HTML-шаблонами
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")

# Основной HTML-шаблон отчёта
SVETOLADA_TEMPLATE = os.path.join(TEMPLATES_DIR, "svetolada_template.html")

# Папка для сохранения PDF
OUTPUT_DIR = os.path.join(BASE_DIR, "..", "output")

# Создаём папку output, если её нет
os.makedirs(OUTPUT_DIR, exist_ok=True)
