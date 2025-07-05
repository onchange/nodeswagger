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

## 📋 API Endpoints

### Basic API (Port 3000)
- `GET /api/hello` - Returns a greeting message
- `GET /api/status` - Returns server status information

### User Management API (Port 3001)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID
- `GET /api/health` - Health check endpoint

## 🧪 Example Usage

### Create a User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

### Get All Users
```bash
curl http://localhost:3001/api/users
```

### Update a User
```bash
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "age": 31}'
```

## 🔍 Key Improvements in Refactored Version

1. **Modular Structure**: Separated concerns into dedicated modules
2. **Reusable Components**: Shared Swagger and Express configuration
3. **Better Error Handling**: Centralized error management with custom error types
4. **Input Validation**: Comprehensive validation middleware
5. **Service Layer**: Business logic separated from route handlers
6. **Environment Configuration**: Flexible configuration management
7. **Consistent Code Style**: Standardized naming and structure
8. **Better Documentation**: Comprehensive API documentation

## 📝 Development Notes

- The legacy `index.js` and `index2.js` files are kept for backward compatibility
- All new development should use the modular structure in the `src/` directory
- The application uses in-memory storage for demonstration purposes
- For production use, consider implementing proper database integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.