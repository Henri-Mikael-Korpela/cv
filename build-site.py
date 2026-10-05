"""Builds the static site into dist/ with cv.html and resume.html.

Usage: python build-site.py
"""
import json
import shutil
from pathlib import Path

from cv_server import SRC_DIR, VARIANTS, render_index_html

DIST_DIR = Path(__file__).resolve().parent / "dist"


def main():
    if DIST_DIR.exists():
        shutil.rmtree(DIST_DIR)
    shutil.copytree(SRC_DIR, DIST_DIR, ignore=shutil.ignore_patterns("index.html"))

    for variant in VARIANTS:
        (DIST_DIR / f"{variant}.html").write_text(render_index_html(variant), encoding="utf-8")

    # Keep the site root serving the CV now that there is no index.html
    config = {"routes": [{"route": "/", "rewrite": "/cv.html"}]}
    (DIST_DIR / "staticwebapp.config.json").write_text(json.dumps(config, indent=2), encoding="utf-8")

    print(f"Built site to {DIST_DIR}")


if __name__ == "__main__":
    main()
