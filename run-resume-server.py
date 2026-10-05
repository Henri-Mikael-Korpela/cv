"""Serves the resume (condensed) version of the CV UI locally.

Usage: python run-resume-server.py [PORT]
"""
import sys

from cv_server import DEFAULT_PORT, serve


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    serve("resume", port)


if __name__ == "__main__":
    main()
