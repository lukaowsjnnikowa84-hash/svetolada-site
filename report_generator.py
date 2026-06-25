from fpdf import FPDF
from datetime import datetime


class PDFTemplate(FPDF):
    def __init__(self):
        super().__init__()
        # Авторазрыв страниц и поля
        self.set_auto_page_break(auto=True, margin=15)
        self.set_margins(20, 20, 20)

        # Подключение шрифтов (пути подстрой под свои файлы)
        self.add_font('Cormorant', '', 'assets/fonts/CormorantGaramond-Regular.ttf', uni=True)
        self.add_font('Cormorant', 'B', 'assets/fonts/CormorantGaramond-Bold.ttf', uni=True)
        self.add_font('Lato', '', 'assets/fonts/Lato-Regular.ttf', uni=True)
        self.add_font('Lato', 'I', 'assets/fonts/Lato-Italic.ttf', uni=True)

        # Цветовая палитра "нежная галактика"
        self.colors = {
            "background": (245, 247, 255),   # светлая туманность
            "accent": (168, 184, 255),       # нежная галактика
            "accent_dark": (143, 160, 255),  # заголовки
            "text": (58, 58, 74),            # мягкий графит
            "line": (221, 230, 255)          # тонкие линии
        }

    # ---------- ТИТУЛЬНАЯ СТРАНИЦА ----------

    def add_cover_page(self, name: str):
        self.add_page()

        # Фон туманности (если есть картинка)
        try:
            self.image("assets/images/nebula_light.png", x=0, y=0, w=210, h=297)
        except Exception:
            # Если нет изображения — заливаем светлым фоном
            self.set_fill_color(*self.colors["background"])
            self.rect(0, 0, 210, 297, 'F')

        # Полупрозрачный белый слой для мягкости
        try:
            self.set_alpha(0.35)
            self.set_fill_color(255, 255, 255)
            self.rect(0, 0, 210, 297, 'F')
            self.set_alpha(1)
        except Exception:
            # Если set_alpha недоступен — просто пропускаем
            pass

        # Логотип Светолада (если есть)
        try:
            self.image("assets/images/logo.png", x=80, y=25, w=50)
        except Exception:
            pass

        # Заголовок
        self.set_xy(0, 110)
        self.set_font('Cormorant', 'B', 42)
        self.set_text_color(*self.colors["accent_dark"])
        self.cell(0, 15, "Светолада ✨", ln=True, align='C')

        # Сияние под заголовком (эллипс)
        try:
            self.set_draw_color(*self.colors["accent"])
            self.set_line_width(0.8)
            if hasattr(self, "set_alpha"):
                self.set_alpha(0.4)
            self.ellipse(55, 150, 100, 18)
            if hasattr(self, "set_alpha"):
                self.set_alpha(1)
        except Exception:
            pass

        # Подзаголовок
        self.set_xy(0, 165)
        self.set_font('Lato', '', 18)
        self.set_text_color(*self.colors["text"])
        self.cell(0, 10, f"Аналитический отчёт для {name}", ln=True, align='C')

        # Дата
        self.set_font('Lato', 'I', 12)
        self.set_text_color(*self.colors["accent"])
        self.cell(0, 10, datetime.now().strftime("%d.%m.%Y"), ln=True, align='C')

    # ---------- РАЗДЕЛЫ ----------

    def add_section(self, title: str, text: str):
        self.add_page()

        # Заголовок раздела
        self.set_font('Cormorant', 'B', 22)
        self.set_text_color(*self.colors["accent_dark"])
        self.cell(0, 10, title, ln=True)

        # Линия под заголовком
        self.set_draw_color(*self.colors["line"])
        y = self.get_y() + 2
        self.line(20, y, 190, y)

        self.ln(10)

        # Основной текст
        self.set_font('Lato', '', 13)
        self.set_text_color(*self.colors["text"])
        self.multi_cell(0, 8, text)

    # ---------- ОГЛАВЛЕНИЕ ----------

    def add_table_of_contents(self, sections: list):
        """
        sections: список кортежей (title, page_number)
        """
        self.add_page()
        self.set_font('Cormorant', 'B', 24)
        self.set_text_color(*self.colors["accent_dark"])
        self.cell(0, 10, "Оглавление", ln=True)
        self.ln(10)

        self.set_font('Lato', '', 13)
        self.set_text_color(*self.colors["text"])

        for i, (title, page) in enumerate(sections, start=1):
            # Простой вариант: "1. Название .......... 5"
            line = f"{i}. {title}"
            dots = "." * (60 - len(line)) if len(line) < 60 else " "
            self.cell(0, 8, f"{line} {dots} {page}", ln=True)

    # ---------- НОМЕРА СТРАНИЦ (ФУТЕР) ----------

    def footer(self):
        self.set_y(-15)
        self.set_font('Lato', 'I', 10)
        self.set_text_color(*self.colors["accent"])
        self.cell(0, 10, f"Страница {self.page_no()}", align='C')

    # ---------- СОХРАНЕНИЕ ----------

    def save(self, output_path: str):
        self.output(output_path)
