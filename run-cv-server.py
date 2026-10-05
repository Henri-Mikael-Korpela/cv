"""Serves the CV UI locally.

Usage: python run-cv-server.py [PORT]
"""
import functools
import http.server
import sys
from pathlib import Path

SRC_DIR = Path(__file__).resolve().parent / "src"
DEFAULT_PORT = 8000


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT

    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(SRC_DIR))

    with http.server.ThreadingHTTPServer(("", port), handler) as server:
        print(f"Serving CV at http://localhost:{port}/ (Ctrl+C to stop)")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
