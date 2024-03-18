# ChatGP

【技育 CAMP2024】ハッカソン Vol.1 に参加して作成したアプリ

こちらからアクセス ⇒ [ChatGP（チャットグランプリ）](https://chatgp.nosse.net/)

## Description

chatGPT を使ったレースゲーム！

## Installation

必要なソフトウェアやライブラリのインストール方法

```bash
docker compose -f docker-compose.prod.yml build

docker compose -f docker-compose.prod.yml run --rm view yarn

docker compose -f docker-compose.prod.yml run --rm view yarn build

docker compose -f docker-compose.prod.yml up -d
```

## File Structure

- `api/`

  - FastAPI を使用したバックエンド処理を記述

- `view/`

  - Next.js を用いてフロントエンドを構築


- `docker-compose.yml`
  - 複数のコンテナを定義し、実行するための設定

