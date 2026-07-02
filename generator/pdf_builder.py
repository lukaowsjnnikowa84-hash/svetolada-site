# generator/pdf_builder.py

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
import logging
import os

def create_pdf(data, output_path):
    """
    Создание PDF отчёта Светолада.
    """

    logging.info("Начинаю создание PDF...")

    # Проверяем, что папка существует
    folder = os.path.dirname(output_path)
    if not os.path.exists(folder):
        os.makedirs(folder)
        logging.info(f"Создан каталог: {folder}")

    c = canvas.Canvas(output_path, pagesize=A4)
    width, height = A4

    # Заголовок
    c.setFont("Helvetica-Bold", 22)
    c.setFillColorRGB(0.72, 0.61, 0.42)
    c.drawCentredString(width / 2, height - 80, "Светолада — Персональный отчёт")

    # Основные данные
    c.setFont("Helvetica", 16)
    c.setFillColorRGB(0.2, 0.2, 0.2)

    c.drawString(60, height - 140, f"Имя: {data.get('name')}")
    c.drawString(60, height - 170, f"Дата рождения: {data.get('birthdate')}")

    partner = data.get("partner")
    if partner:
        c.drawString(60, height - 200, f"Партнёр: {partner}")

    # Разделы
    c.setFont("Helvetica-Bold", 18)
    c.drawString(60, height - 260, "Основные разделы:")

    c.setFont("Helvetica", 14)
    y = height - 300

    sections = data.get("sections", {})

    for num, section in sections.items():
        title = section.get("title", "")
        text = section.get("text", "")

        c.drawString(60, y, f"{num}. {title}")
        y -= 20

        excerpt = text[:180] + "..."
        c.setFont("Helvetica", 12)
        c.drawString(80, y, excerpt)
        y -= 40
        c.setFont("Helvetica", 14)

        if y < 120:
            c.showPage()
            y = height - 100

    c.save()
    logging.info(f"PDF сохранён: {output_path}")
