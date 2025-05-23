from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

PORT = int(os.environ.get('PORT', 8081))

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Set the required CORS headers
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Resource-Policy', 'cross-origin')
        SimpleHTTPRequestHandler.end_headers(self)

    def log_message(self, format, *args):
        print(f"{self.address_string()} - {format % args}")

handler = CORSRequestHandler
httpd = HTTPServer(("", PORT), handler)

print(f"Server running at http://localhost:{PORT}/")
print("IMPORTANT: Required CORS headers are being set:")
print("Cross-Origin-Embedder-Policy: require-corp")
print("Cross-Origin-Opener-Policy: same-origin")
print("Cross-Origin-Resource-Policy: cross-origin")

httpd.serve_forever()
