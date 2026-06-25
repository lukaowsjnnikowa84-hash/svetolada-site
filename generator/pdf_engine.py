from fpdf import FPDF

# ---------------------------------------------------------
#  PDF класс с поддержкой стилей Светолада
# ---------------------------------------------------------

class SvetoladaPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=15)

        # Шрифты
        self.add_font("DejaVu", "", "fonts/DejaVuSans.ttf", uni=True)
        self.add_font("DejaVu", "B", "fonts/DejaVuSans-Bold.ttf", uni=True)
        self.set_font("DejaVu", size=12)

    # -----------------------------------------------------
    #  Декоративная линия
    # -----------------------------------------------------
    def divider(self):
        self.ln(5)
        self.set_draw_color(200, 180, 165)
        self.set_line_width(0.4)
        self.line(20, self.get_y(), 190, self.get_y())
        self.ln(5)

    # -----------------------------------------------------
    #  Обложка
    # -----------------------------------------------------
    def cover_page(self, title):
        self.add_page()

        # фон
        self.set_fill_color(238, 223, 212)
        self.rect(0, 0, 210, 297, 'F')

        # заголовок
        self.set_text_color(90, 80, 70)
        self.set_font("DejaVu", "B", 28)
        self.ln(60)
        self.multi_cell(0, 15, title, align="C")

        # подзаголовок
        self.set_font("DejaVu", "", 16)
        self.ln(10)
        self.multi_cell(0, 10, "Персональный отчёт Светолада", align="C")

        # декоративная линия
        self.ln(20)
        self.set_draw_color(140, 120, 110)
        self.set_line_width(0.8)
        self.line(40, self.get_y(), 170, self.get_y())

    # -----------------------------------------------------
    #  Заголовок раздела
    # -----------------------------------------------------
    def section_title(self, text):
        self.ln(5)
        self.set_font("DejaVu", "B", 18)
        self.set_text_color(90, 80, 70)
        self.multi_cell(0, 12, text)
        self.divider()

    # -----------------------------------------------------
    #  Подзаголовок блока
    # -----------------------------------------------------
    def block_title(self, text):
        self.set_font("DejaVu", "B", 14)
        self.set_text_color(110, 95, 85)
        self.ln(3)
        self.multi_cell(0, 8, text)

    # -----------------------------------------------------
    #  Обычный текст
    # -----------------------------------------------------
    def paragraph(self, text):
        self.set_font("DejaVu", "", 12)
        self.set_text_color(60, 50, 45)
        self.multi_cell(0, 7, text)
        self.ln(1)


# ---------------------------------------------------------
#  Основная функция генерации PDF
# ---------------------------------------------------------

def generate_pdf(report, filename="svetolada_report.pdf"):
    pdf = SvetoladaPDF()

    # -----------------------------
    #  ОБЛОЖКА
    # -----------------------------
    pdf.cover_page(report["title"])

    # -----------------------------
    #  ВВЕДЕНИЕ
    # -----------------------------
    pdf.add_page()
    pdf.section_title("Введение")
    pdf.paragraph(report["introduction"])

    # -----------------------------
    #  РАЗДЕЛЫ
    # -----------------------------
    for section in report["sections"]:
        pdf.add_page()
        pdf.section_title(section["title"])

        pdf.block_title("Ключевая идея")
        pdf.paragraph(section["key"])

        pdf.block_title("Сильные стороны")
        pdf.paragraph(section["strengths"])

        pdf.block_title("Слабые стороны")
        pdf.paragraph(section["weaknesses"])

        pdf.block_title("Рекомендации")
        pdf.paragraph(section["recommendations"])

        pdf.block_title("Итог")
        pdf.paragraph(section["summary"])

        # Если есть партнёр — добавляем
        if section.get("partner"):
            pdf.block_title("Данные партнёра")
            pdf.paragraph(str(section["partner"]))

    # -----------------------------
    #  ЗАКЛЮЧЕНИЕ
    # -----------------------------
    pdf.add_page()
    pdf.section_title("Заключение")
    pdf.paragraph(report["conclusion"])

    # -----------------------------
    #  СОХРАНЕНИЕ
    # -----------------------------
    pdf.output(filename)
    return filename
