# Terrarium - Terraria in the Browser

A port of Terraria to the browser using WebAssembly.

## Running Locally

1. Start the Python server:
   ```
   python3 server.py
   ```

2. Open your browser to http://localhost:8081

## Required Headers

This application requires the following Cross-Origin headers:

- Cross-Origin-Embedder-Policy: require-corp
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Resource-Policy: cross-origin

## Deployment

This repository includes configuration files for:
- Docker deployment
- Render.com deployment

The included Python server sets all required headers for proper operation.
