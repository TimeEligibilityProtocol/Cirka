"""Static file server for the exported web build that disables caching.

The plain `python3 -m http.server` doesn't send explicit Cache-Control
headers, which lets mobile browsers cache index.html/JS bundles across
reloads — after every new export, phones/browsers can keep showing the
previous build until the cache is manually cleared. This server always
tells the browser not to cache, so a normal refresh always fetches the
latest export.
"""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import sys


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8090
    server = ThreadingHTTPServer(("0.0.0.0", port), NoCacheHandler)
    print(f"Serving (no-cache) on :{port}")
    server.serve_forever()
