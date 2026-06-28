import sys
import os

# Добавляем путь к корню проекта
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, project_root)

from backend.svetolada_pdf import generate_pdf

generate_pdf(
    report_text="Тестовый текст Светолада",
    name="Тест",
    birth_date="01.01.2000",
    filename="test_svetolada.pdf"
)



