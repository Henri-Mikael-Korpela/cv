"""Shared helpers for serving the CV UI in its different variants.

The "cv" variant is the full CV as-is. The "resume" variant is the same page
with `data-variant="resume"` set on the root element, which condenses the
page via CSS in index.html.
"""
import functools
import http.server
import re
from pathlib import Path

SRC_DIR = Path(__file__).resolve().parent / "src"
INDEX_PATH = SRC_DIR / "index.html"
DEFAULT_PORT = 8000
VARIANTS = {
    "cv": "CV",
    "resume": "Resume"
}


def render_index_html(variant: str) -> str:
    if variant not in VARIANTS:
        raise ValueError(f"Unknown variant: {variant}")

    html = INDEX_PATH.read_text(encoding="utf-8")
    if variant == "cv":
        return html
    html = re.sub(r"<html\b", f'<html data-variant="{variant}"', html, count=1)
    return html.replace("<title>CV - ", f"<title>{VARIANTS[variant]} - ", 1)


class VariantRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, variant: str, **kwargs):
        self.variant = variant
        super().__init__(*args, directory=str(SRC_DIR), **kwargs)

    def do_GET(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if path not in ("/", "/index.html"):
            return super().do_GET()

        body = render_index_html(self.variant).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def serve(variant: str, port: int = DEFAULT_PORT):
    handler = functools.partial(VariantRequestHandler, variant=variant)

    with http.server.ThreadingHTTPServer(("", port), handler) as server:
        print(f"Serving {variant} at http://localhost:{port}/ (Ctrl+C to stop)")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
