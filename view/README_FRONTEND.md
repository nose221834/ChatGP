# view
フロントエンドを記述

## Description
FastAPIを使用してChatGPTAPIを操作できるようにする.

## Usage
各ディレクトリの説明

- `.yarn/`
  - yarnのバージョン情報が入っている

- `public/`
  - 使用画像が入っている

- `src/`
  - `app/`
      - `page.tsx`
        - `/`のページ内容
      - `layout.tsx`
        - プロジェクト全体を囲むtsx
        - `create/`
          - 車作成画面
          - `result/`
            - 作成された画像を表示する画面
        - `race/`
          - レースが進行する画面
        - `ending/`
          - エンディングを表示する画面
  - `components/`
    - shadcn/uiがここにinstallされる
  - `lib/`
    - 各関数を設定
    - serverActionsなどがある
  - `tailwind.config.ts`
    - tailwindの設定を記述
    - 枠つき文字などをここで追加している
  - `tsconfig.json`
    - typescriptの設定が記述されている
  - `view.Dockerfile`
    - viewのコンテナを作るためのDockerfile
