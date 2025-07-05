# NodeSwagger Client

Node.js + Express + Swagger APIと連携するReactフロントエンドクライアント

## 概要

このプロジェクトは、[NodeSwagger](../README.md) APIサーバーと連携するReactベースのフロントエンドクライアントです。APIとの通信をテストし、レスポンスを視覚的に確認できるWebアプリケーションです。

## 主な特徴

- **React 18**: 最新のReactフレームワーク
- **モダンUI**: レスポンシブデザインとモダンなスタイリング
- **API連携**: NodeSwagger APIとのリアルタイム通信
- **エラーハンドリング**: 適切なエラーメッセージ表示
- **状態管理**: React Hooksを使用した状態管理

## 必要な環境

- Node.js (v16 以上推奨)
- npm または yarn
- **NodeSwagger APIサーバー** (親ディレクトリで起動)

## インストールと起動

### 1. 依存関係をインストール

```bash
npm install
```

### 2. 開発サーバーを起動

```bash
npm start
```

アプリケーションが `http://localhost:3001` で起動します。

### 3. NodeSwagger APIサーバーを起動

別のターミナルで親ディレクトリに移動してAPIサーバーを起動：

```bash
cd ..
npm start
```

NodeSwagger APIサーバーが `http://localhost:3000` で起動します。

## 使用方法

### 基本的な使い方

1. **API接続確認**: 「接続確認」ボタンでNodeSwagger APIサーバーとの接続状況を確認
2. **API テスト**: 「Hello APIを呼び出す」ボタンでAPIエンドポイントをテスト
3. **レスポンス確認**: APIからのレスポンスメッセージを確認
4. **エラーハンドリング**: 接続エラーやAPIエラーの適切な表示

### 機能詳細

#### API接続状況
- リアルタイムでAPIサーバーの状態を確認
- 接続成功/失敗の視覚的な表示
- 手動での接続確認機能

#### API テスト
- Hello APIエンドポイントの呼び出し
- ローディング状態の表示
- レスポンスデータの表示
- エラーメッセージの表示

#### 開発者向け情報
- API URL と エンドポイント情報
- Swagger UI へのリンク
- 使用方法の説明

## プロジェクト構造

```
nodeswagger-client/
├── public/
│   └── index.html        # メインHTMLファイル
├── src/
│   ├── App.js           # メインReactコンポーネント
│   ├── App.css          # スタイルシート
│   └── index.js         # エントリーポイント
├── package.json         # プロジェクト設定
├── README.md           # このファイル
└── .gitignore          # Git除外設定
```

## API エンドポイント

### Hello API
- **URL**: `http://localhost:3000/api/hello`
- **メソッド**: GET
- **レスポンス**: 
  ```json
  {
    "message": "Hello, world!"
  }
  ```

### Swagger UI
- **URL**: `http://localhost:3000/api-docs`
- **説明**: APIドキュメントの確認

## 開発用スクリプト

```bash
# 開発サーバー起動
npm start

# プロダクションビルド
npm run build

# テスト実行
npm test

# 設定の退避（通常使用しない）
npm run eject
```

## CORS設定について

NodeSwagger APIサーバーでCORSが適切に設定されている必要があります。開発環境では `localhost:3001` からのアクセスを許可する必要があります。

## トラブルシューティング

### よくある問題

1. **API接続エラー**
   - NodeSwagger APIサーバーが起動していることを確認
   - `http://localhost:3000` でアクセス可能か確認

2. **CORS エラー**
   - APIサーバーのCORS設定を確認
   - ブラウザの開発者ツールでエラーメッセージを確認

3. **ポートエラー**
   - デフォルトでReactアプリは3001ポートで起動
   - 3000ポートはAPIサーバー用に予約

## 技術スタック

- **フロントエンド**: React 18, React DOM
- **ビルドツール**: React Scripts (Create React App)
- **スタイリング**: CSS3, Flexbox, Grid
- **HTTP通信**: Fetch API
- **状態管理**: React Hooks (useState, useEffect)

## 拡張可能性

このクライアントは以下の機能を簡単に追加できます：

- 追加のAPIエンドポイントのテスト
- 認証機能
- データの永続化
- 高度なUI/UXコンポーネント
- テストケースの追加

## ライセンス

ISC

## 関連リンク

- [NodeSwagger APIサーバー](../README.md)
- [React公式ドキュメント](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)

## 作者

このプロジェクトは NodeSwagger API のフロントエンドクライアントとして開発されました。