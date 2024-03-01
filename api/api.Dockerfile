FROM python:3.11

WORKDIR /api

COPY ./ /api

RUN install --no-cache-dir --upgrade -r /api/requirements.txt 
