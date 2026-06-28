# svetolada_pdf.py
# Космическая книга Светолада — финальная версия
# Работает с config.py, ресурсами и создаёт PDF в папку /pdf

from fpdf import FPDF
from config import RESOURCES_PATH, PDF_PATH


class SvetoladaPDF(FPDF):

    # ---------------------------
    # НУМЕРАЦИЯ СТРАНИЦ (✧ 3)
    # ---------------------------
    def footer(self):
        if self.page_no() <= 3:
            return  # титульный, данные, оглавление — без номеров

        self.set_y(-20)
        self.set_font("Times", size=11)
        self.set_text_color(150, 130, 110)
        self.cell(0, 10, f"✧ {self.page_no() - 3}", align="C")

    # ---------------------------
    # ВОДЯНОЙ ЗНАК (icon.png)
    # ---------------------------
    def watermark(self):
        if self.page_no() <= 3:
            return

        try:
            self.set_alpha(0.08)  # лёгкое сияние
            self.image(RESOURCES_PATH + "icon.png", x=150, y=200, w=300)
            self.set_alpha(1)
        except:
            pass

    # ---------------------------
    # КОСМИЧЕСКИЕ УГОЛКИ (corner.png)
    # ---------------------------
    def cosmic_corners(self):
        try:
            corner = RESOURCES_PATH + "corner.png"
            self.image(corner, x=20, y=20, w=40)
            self.image(corner, x=530, y=20, w=40)
            self.image(corner, x=20, y=780, w=40)
            self.image(corner, x=530, y=780, w=40)
        except:
            pass

    # ---------------------------
    # ТИТУЛЬНЫЙ ЛИСТ
    # ---------------------------
    def add_cover(self, name, birth_date):
        self.add_page()

        try:
            self.image(RESOURCES_PATH + "cover.png", x=0, y=0, w=595, h=842)
        except:
            pass

        self.set_font("Times", "B", 36)
        self.set_text_color(240, 220, 180)
        self.ln(140)
        self.cell(0, 20, "Светолада", align="C")

        self.set_text_color(255, 255, 255)
        self.set_font("Times", "B", 37)
        self.set_xy(0, 138)
        self.cell(0, 20, "Светолада", align="C")

        self.set_text_color(230, 210, 170)
        self.set_font("Times", size=20)
        self.ln(50)
        self.cell(0, 12, "Персональный космический анализ", align="C")

    # ---------------------------
    # СТРАНИЦА С ДАННЫМИ
    # ---------------------------
    def add_logo_page(self, name, birth_date, place=None, time=None, partner=None):
        self.add_page()

        try:
            self.image(RESOURCES_PATH + "logo.png", x=220, y=40, w=150)
            self.ln(120)
        except:
            self.ln(40)

        self.set_font("Times", "B", 22)
        self.set_text_color(90, 70, 50)
        self.cell(0, 14, name, align="C")
        self.ln(12)

        self.set_font("Times", size=18)
        self.set_text_color(110, 90, 70)
        self.cell(0, 12, birth_date, align="C")
        self.ln(12)

        if place:
            self.cell(0, 12, place, align="C")
            self.ln(12)

        # Разделитель
        self.ln(10)
        self.set_draw_color(200, 180, 150)
        self.set_line_width(0.6)
        self.line(80, self.get_y(), 515, self.get_y())
        self.ln(20)

        # Исходные данные
        self.set_font("Times", "B", 15)
        self.set_text_color(100, 80, 60)
        self.cell(0, 12, "Исходные данные для анализа:", ln=True)

        self.set_font("Times", size=12)
        self.set_text_color(70, 60, 50)

        self.multi_cell(0, 10, f"• Имя: {name}")
        self.multi_cell(0, 10, f"• Дата рождения: {birth_date}")
        self.multi_cell(0, 10, f"• Место рождения: {place or 'не указано'}")
        self.multi_cell(0, 10, f"• Время рождения: {time or 'не указано'}")
        self.multi_cell(0, 10, f"• Данные партнёра: {partner or 'не указаны'}")

        self.ln(15)

    # ---------------------------
    # ОГЛАВЛЕНИЕ
    # ---------------------------
    def add_toc(self, toc_entries):
        self.add_page()

        self.set_font("Times", "B", 22)
        self.set_text_color(120, 90, 60)
        self.cell(0, 20, "Оглавление", ln=True, align="C")
        self.ln(10)

        self.set_font("Times", size=13)
        self.set_text_color(70, 60, 50)

        for title, page in toc_entries:
            dots = "." * (80 - len(title))
            self.cell(0, 10, f"{title} {dots} ✧ {page}", ln=True)

        self.ln(10)

    # ---------------------------
    # ЗАГОЛОВОК РАЗДЕЛА
    # ---------------------------
    def chapter_title(self, title):
        self.add_page()
        self.watermark()
        self.cosmic_corners()

        self.set_font("Times", "B", 16)
        self.set_text_color(120, 90, 60)
        self.ln(5)
        self.multi_cell(0, 10, title)
        self.ln(5)

        # Космический разделитель ✧
        self.set_draw_color(200, 180, 150)
        self.set_line_width(0.5)
        y = self.get_y()
        self.line(100, y, 480, y)
        self.set_font("Times", "B", 14)
        self.set_text_color(150, 120, 100)
        self.set_xy(0, y - 5)
        self.cell(0, 10, "✧", align="C")
        self.ln(10)

    # ---------------------------
    # ТЕКСТ РАЗДЕЛА
    # ---------------------------
    def chapter_body(self, text):
        self.set_font("Times", size=12)
        self.set_text_color(60, 50, 40)
        self.multi_cell(0, 8, text)
        self.ln(3)

    # ---------------------------
    # ПОСЛЕСЛОВИЕ
    # ---------------------------
    def add_conclusion(self, variant="A"):
        self.add_page()
        self.watermark()
        self.cosmic_corners()

        self.set_font("Times", "B", 18)
        self.set_text_color(120, 90, 60)
        self.cell(0, 15, "Заключение", ln=True, align="C")
        self.ln(10)

        self.set_font("Times", size=13)
        self.set_text_color(70, 60, 50)

        if variant == "A":
            text = (
                "Каждый человек — это вселенная, в которой свет и тьма танцуют в своём ритме.\n"
                "Светолада раскрывает этот танец, показывая, где сияние становится путеводной звездой,\n"
                "а где тень превращается в мудрость.\n\n"
                "Пусть этот анализ станет для тебя не ответом, а началом пути — пути к себе, к своему свету."
            )
        else:
            text = (
                "Этот отчёт завершает анализ ключевых аспектов твоей личности и внутреннего света.\n"
                "Он создан, чтобы помочь тебе увидеть себя глубже, яснее и мягче.\n\n"
                "Используй его как инструмент понимания своих сильных сторон и направлений роста.\n"
                "Пусть Светолада станет твоим спутником на пути к себе."
            )

        self.multi_cell(0, 10, text)
        self.ln(20)

        # Символ Светолада внизу страницы
        try:
            self.image(RESOURCES_PATH + "icon.png", x=230, y=700, w=130)
        except:
            pass


# ---------------------------
# ГЕНЕРАЦИЯ PDF
# ---------------------------
def generate_pdf(report_text, name, birth_date,
                 place=None, time=None, partner=None,
                 filename="svetolada_report.pdf",
                 conclusion_variant="A"):

    pdf = SvetoladaPDF()

    # 1. Титульный лист
    pdf.add_cover(name, birth_date)

    # 2. Страница с данными
    pdf.add_logo_page(name, birth_date, place, time, partner)

    # 3. Собираем оглавление
    toc_entries = []

    # 4. Основной текст
    for block in report_text.split("\n\n"):
        block = block.strip()
        if not block:
            continue

        if block[0].isdigit() and "." in block[:5]:
            title = block
            page_number = len(toc_entries) + 1
            toc_entries.append((title, page_number))
            pdf.chapter_title(block)
        else:
            pdf.chapter_body(block)

    # 5. Оглавление (третья страница)
    pdf.page = 3
    pdf.add_toc(toc_entries)

    # 6. Послесловие
    pdf.add_conclusion(conclusion_variant)

    # 7. Сохраняем
    pdf.output(PDF_PATH + filename)
    return filename
