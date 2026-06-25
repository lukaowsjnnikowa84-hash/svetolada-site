import json
from fpdf import FPDF
import os
import sys

# ---------------------------------------------------------
#  КЛАСС PDF С РАСШИРЕНИЯМИ СТИЛЯ СВЕТОЛАДЫ
# ---------------------------------------------------------

class SvetoladaPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=False, margin=15)
        self.page_number_offset = 0
        self.toc = []  # table of contents

        # Подключаем Unicode‑шрифты
        self.add_font("DejaVu", "", "fonts/DejaVuSans.ttf")
        self.add_font("DejaVu", "B", "fonts/DejaVuSans-Bold.ttf")
        self.add_font("DejaVu", "I", "fonts/DejaVuSans-Oblique.ttf")

        self.set_font("DejaVu", size=14)

    # ------------------------------
    #  УГОЛОЧКИ
    # ------------------------------
    def draw_corners(self):
        margin = 10
        size = 15

        # левый верхний
        self.line(margin, margin, margin + size, margin)
        self.line(margin, margin, margin, margin + size)

        # правый верхний
        self.line(210 - margin, margin, 210 - margin - size, margin)
        self.line(210 - margin, margin, 210 - margin, margin + size)

        # левый нижний
        self.line(margin, 297 - margin, margin + size, 297 - margin)
        self.line(margin, 297 - margin, margin, 297 - margin - size)

        # правый нижний
        self.line(210 - margin, 297 - margin, 210 - margin - size, 297 - margin)
        self.line(210 - margin, 297 - margin, 210 - margin, 297 - margin - size)

    # ------------------------------
    #  НУМЕРАЦИЯ СТРАНИЦ
    # ------------------------------
    def footer(self):
        self.set_y(-12)
        self.set_font("DejaVu", size=10)
        page = self.page_no() - self.page_number_offset
        if page > 0:
            self.cell(0, 10, f"{page}", align="C")

    # ------------------------------
    #  ДОБАВЛЕНИЕ РАЗДЕЛА В ОГЛАВЛЕНИЕ
    # ------------------------------
    def add_toc_entry(self, title):
        self.toc.append((title, self.page_no()))

    # ------------------------------
    #  ОТРИСОВКА ОГЛАВЛЕНИЯ
    # ------------------------------
    def render_toc(self):
        self.add_page()
        self.draw_corners()
        self.set_font("DejaVu", "B", 18)
        self.cell(0, 15, "Оглавление", new_x="LMARGIN", new_y="NEXT", align="C")
        self.ln(10)

        self.set_font("DejaVu", size=12)

        for title, page in self.toc:
            dots = "." * (80 - len(title))
            self.cell(0, 8, f"{title} {dots} {page}", new_x="LMARGIN", new_y="NEXT")

# ---------------------------------------------------------
#  ФУНКЦИИ ДЛЯ РЕНДЕРА БЛОКОВ
# ---------------------------------------------------------

def render_title(pdf, text):
    pdf.add_page()
    pdf.draw_corners()
    pdf.set_font("DejaVu", "B", 22)
    pdf.multi_cell(0, 12, text, align="C")
    pdf.ln(10)
    pdf.add_toc_entry(text)

def render_intro(pdf, text):
    pdf.add_page()
    pdf.draw_corners()
    pdf.set_font("DejaVu", "B", 16)
    pdf.multi_cell(0, 10, "Введение")
    pdf.ln(4)

    pdf.set_font("DejaVu", size=12)
    pdf.multi_cell(0, 7, text)
    pdf.ln(5)

    pdf.add_toc_entry("Введение")

def render_conclusion(pdf, text):
    pdf.add_page()
    pdf.draw_corners()
    pdf.set_font("DejaVu", "B", 16)
    pdf.multi_cell(0, 10, "Заключение")
    pdf.ln(4)

    pdf.set_font("DejaVu", size=12)
    pdf.multi_cell(0, 7, text)
    pdf.ln(5)

    pdf.add_toc_entry("Заключение")

def render_section(pdf, section):
    pdf.add_page()
    pdf.draw_corners()

    block = section.get("block", "")
    title = section.get("title", "Без названия")

    # маленькая строка блока
    if block:
        pdf.set_font("DejaVu", "I", 11)
        pdf.multi_cell(0, 6, block)
        pdf.ln(2)

    # заголовок раздела
    pdf.set_font("DejaVu", "B", 16)
    pdf.multi_cell(0, 10, title)
    pdf.ln(4)

    pdf.add_toc_entry(title)

    # вложенные блоки
    pdf.set_font("DejaVu", size=12)

    def render_dict_block(name, data):
        if not data:
            return  # пропускаем пустые блоки
        pdf.set_font("DejaVu", "B", 13)
        pdf.multi_cell(0, 8, name)
        pdf.ln(1)
        pdf.set_font("DejaVu", size=12)
        for key, value in data.items():
            pdf.multi_cell(0, 7, f"• {key}: {value}")
        pdf.ln(3)

    render_dict_block("Ключевые параметры", section.get("key", {}))
    render_dict_block("Сильные стороны", section.get("strengths", {}))
    render_dict_block("Уязвимости", section.get("weaknesses", {}))
    render_dict_block("Рекомендации", section.get("recommendations", {}))
    render_dict_block("Итог", section.get("summary", {}))

# ---------------------------------------------------------
#  ОСНОВНАЯ ФУНКЦИЯ ГЕНЕРАЦИИ ОТЧЁТА
# ---------------------------------------------------------

def generate_report(json_path, output_path="svetolada_report.pdf"):
    if not os.path.exists(json_path):
        raise FileNotFoundError(f"JSON файл не найден: {json_path}")

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    pdf = SvetoladaPDF()
    pdf.set_title("Светолада — персональный отчёт")

    # титульная страница
    render_title(pdf, data.get("title", "Отчёт Светолада"))

    # введение
    intro = data.get("introduction")
    if intro:
        render_intro(pdf, intro)

    # секции
    for section in data.get("sections", []):
        render_section(pdf, section)

    # заключение
    conclusion = data.get("conclusion")
    if conclusion:
        render_conclusion(pdf, conclusion)

    # оглавление
    pdf.render_toc()

    pdf.output(output_path)
    return output_path

# ---------------------------------------------------------
#  MAIN()
# ---------------------------------------------------------

def main():
    if len(sys.argv) < 2:
        print("Использование: python report.py data/example.json")
        return

    json_path = sys.argv[1]
    output = generate_report(json_path)
    print(f"PDF создан: {output}")

if __name__ == "__main__":
    main()




