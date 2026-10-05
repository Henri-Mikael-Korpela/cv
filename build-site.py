"""Builds the static site into dist/ with index.html, cv.html and resume.html.

Usage: python build-site.py
"""
import shutil
from pathlib import Path

from cv_server import SRC_DIR, VARIANTS, render_index_html

ROOT_DIR = Path(__file__).resolve().parent
DIST_DIR = ROOT_DIR / "dist"
LANDING_PATH = ROOT_DIR / "landing" / "index.html"


def main():
    if DIST_DIR.exists():
        shutil.rmtree(DIST_DIR)
    shutil.copytree(SRC_DIR, DIST_DIR, ignore=shutil.ignore_patterns("index.html"))

    for variant in VARIANTS:
        (DIST_DIR / f"{variant}.html").write_text(render_index_html(variant), encoding="utf-8")

    # Azure Static Web Apps requires index.html, so it links to both pages
    shutil.copy(LANDING_PATH, DIST_DIR / "index.html")

    print(f"Built site to {DIST_DIR}")


if __name__ == "__main__":
    main()
