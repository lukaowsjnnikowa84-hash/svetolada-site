# routes/generate_pdf.py

from flask import Blueprint, request, jsonify
from generator.pdf_builder import create_pdf
import os
import uuid

generate_pdf_bp = Blueprint("generate_pdf", __name__)

@generate_pdf_bp.route("/generate_pdf", methods=["POST"])
def generate_pdf():
    try:
        data = request.get_json()

        # Генерация уникального имени файла
        pdf_name = f"{uuid.uuid4()}.pdf"
        pdf_path = os.path.join("pdf", pdf_name)

        # Создание PDF
        create_pdf(data, pdf_path)

        return jsonify({
            "status": "ok",
            "pdf_path": pdf_path
        })

    except Exception as e:
        print("PDF generation error:", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        })
