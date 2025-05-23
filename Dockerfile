FROM python:3.9-slim

WORKDIR /app

# Copy all files
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Set environment variables
ENV PORT=8080

# Start the application
CMD ["python", "server.py"]
