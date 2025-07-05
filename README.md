# Swagger ドキュメント付き Node.js Express API

基本的なエンドポイントとユーザー管理機能を備えた、包括的なSwaggerドキュメントを持つモジュラーなExpress.js APIです。

## 🚀 機能

- **モジュラーアーキテクチャ**: ルート、サービス、ミドルウェア、設定用の専用モジュールによる明確な関心事の分離
- **Swagger ドキュメント**: OpenAPI 3.0 仕様を使用したインタラクティブな API ドキュメント
- **ユーザー管理**: ユーザーエンティティの完全な CRUD 操作
- **入力検証**: 包括的なリクエスト検証ミドルウェア
- **エラーハンドリング**: 意味のあるエラーレスポンスを持つ集中的なエラーハンドリング
- **ヘルスチェック**: 組み込みのヘルス監視エンドポイント
- **環境設定**: 柔軟な設定管理

## 📁 プロジェクト構造

```
├── src/
│   ├── config/
│   │   ├── environment.js      # 環境設定
│   │   └── swagger.js          # Swagger設定
│   ├── middleware/
│   │   ├── errorHandler.js     # エラーハンドリングミドルウェア
│   │   └── validation.js       # 入力検証ミドルウェア
│   ├── routes/
│   │   ├── basicRoutes.js      # 基本的なAPIエンドポイント
│   │   ├── userRoutes.js       # ユーザー管理エンドポイント
│   │   └── healthRoutes.js     # ヘルスチェックエンドポイント
│   ├── services/
│   │   └── userService.js      # ユーザービジネスロジック
│   ├── app.js                  # Express アプリケーションファクトリー
│   ├── server.js               # 基本的なAPIサーバー
│   └── userServer.js           # ユーザー管理サーバー
├── index.js                    # レガシー基本API（互換性のため保持）
├── index2.js                   # レガシーユーザーAPI（互換性のため保持）
└── package.json
```

## 🛠 インストール

1. リポジトリをクローン:
```bash
git clone https://github.com/onchange/nodeswagger.git
cd nodeswagger
```

2. 依存関係をインストール:
```bash
npm install
```

## 🚀 使用方法

### 基本的なAPIサーバーの起動
```bash
npm start
# または
npm run dev  # 開発用にnodemonを使用
```
サーバーは `http://localhost:3000` で実行されます

### ユーザー管理APIサーバーの起動
```bash
npm run start:users
# または
npm run dev:users  # 開発用にnodemonを使用
```
サーバーは `http://localhost:3001` で実行されます

### レガシーサーバー（互換性のため）
```bash
npm run start:legacy   # 元のindex.js
npm run start:legacy2  # 元のindex2.js
```

## 📖 API ドキュメント

サーバーが起動したら、インタラクティブなSwaggerドキュメントにアクセスできます：

- 基本的なAPI: `http://localhost:3000/api-docs`
- ユーザー管理API: `http://localhost:3001/api-docs`

## 🔧 設定

環境変数を使用してアプリケーションを設定できます：

```bash
PORT=3000                    # 基本的なAPIポート
USER_API_PORT=3001          # ユーザー管理APIポート
NODE_ENV=development        # 環境（development/production）
```

## 📋 API エンドポイント

### 基本的なAPI (ポート 3000)
- `GET /api/hello` - グリーティングメッセージを返します
- `GET /api/status` - サーバーステータス情報を返します

### ユーザー管理API (ポート 3001)
- `GET /api/users` - 全ユーザーを取得
- `GET /api/users/:id` - IDでユーザーを取得
- `POST /api/users` - 新しいユーザーを作成
- `PUT /api/users/:id` - IDでユーザーを更新
- `DELETE /api/users/:id` - IDでユーザーを削除
- `GET /api/health` - ヘルスチェックエンドポイント

## 🧪 使用例

### ユーザーの作成
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

### 全ユーザーの取得
```bash
curl http://localhost:3001/api/users
```

### ユーザーの更新
```bash
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "age": 31}'
```

## 🔍 リファクタリング版の主な改善点

1. **モジュラー構造**: 専用モジュールによる関心事の分離
2. **再利用可能なコンポーネント**: SwaggerとExpressの共有設定
3. **エラーハンドリングの改善**: カスタムエラータイプによる集中的なエラー管理
4. **入力検証**: 包括的な検証ミドルウェア
5. **サービス層**: ルートハンドラーから分離されたビジネスロジック
6. **環境設定**: 柔軟な設定管理
7. **一貫したコードスタイル**: 標準化された命名規則と構造
8. **ドキュメントの改善**: 包括的なAPIドキュメント

## 📝 開発ノート

- レガシーの`index.js`と`index2.js`ファイルは後方互換性のため保持されています
- すべての新しい開発は`src/`ディレクトリのモジュラー構造を使用してください
- アプリケーションはデモンストレーション目的でインメモリストレージを使用します
- プロダクション環境での使用時は、適切なデータベース統合の実装を検討してください

## 🤝 コントリビューション

1. リポジトリをフォークします
2. 機能ブランチを作成します
3. 変更を行います
4. 該当する場合はテストを追加します
5. プルリクエストを提出します

## 📄 ライセンス

このプロジェクトはISCライセンスの下でライセンスされています。