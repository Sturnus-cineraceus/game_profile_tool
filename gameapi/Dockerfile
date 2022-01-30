FROM tiangolo/uvicorn-gunicorn-fastapi:latest

COPY ./app /app/app
WORKDIR /app
RUN pip install -r app/requirements.txt
