![Test](https://github.com/sharehouse-sanhaimu/ChatGP/actions/workflows/build_test.yml/badge.svg)

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

### Deletion

```bash
docker compose -f docker-compose.prod.yml down
```

### Use Script

Installtionをまとめて実行

```bash
$ bash ./script/up.sh
```

Deletionを実行

```bash
$ bash ./script/down.sh
```

## File Structure

- `api/`

  - FastAPI を使用したバックエンド処理を記述

- `view/`

  - Next.js を用いてフロントエンドを構築

- `script/`

  - インストールや削除を行うシェルスクリプト

- `docker-compose.yml`
  - 複数のコンテナを定義し、実行するための設定

