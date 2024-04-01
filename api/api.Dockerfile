FROM python:3.10-slim-bookworm

WORKDIR /api

COPY ./ /api

RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt 
