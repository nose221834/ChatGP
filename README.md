[![Super-Linter](https://github.com/sharehouse-sanhaimu/ChatGP/actions/workflows/super_linter/badge.svg)](https://github.com/marketplace/actions/super-linter)


# ChatGP

【技育 CAMP2024】ハッカソン Vol.1 に参加して作成したアプリ

## Description

プロジェクトの概要

## Installation

必要なソフトウェアやライブラリのインストール方法

```bash
docker compose -f docker-compose.prod.yml build

docker compose -f docker-compose.prod.yml run --rm view yarn build

docker compose -f docker-compose.prod.yml up -d
```

## File Structure

- api/
  - FastAPI を使用したバックエンド処理を記述

- view/
  - Next.jsを用いてフロントエンドを構築

- docker-compose.yml
  - 複数のコンテナを定義し、実行するための設定

