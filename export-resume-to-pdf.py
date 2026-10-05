"""Exports the resume version of the CV to resume.pdf.

Reuses the export logic in export-cv-to-pdf.py, which cannot be imported
with a regular import statement because of the hyphens in its file name.
"""
import importlib.util
from pathlib import Path

CV_EXPORT_PATH = Path(__file__).resolve().parent / "export-cv-to-pdf.py"


def main():
    spec = importlib.util.spec_from_file_location("export_cv_to_pdf", CV_EXPORT_PATH)
    export_cv_to_pdf = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(export_cv_to_pdf)

    export_cv_to_pdf.main("resume")


if __name__ == "__main__":
    main()
