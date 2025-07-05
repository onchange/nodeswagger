# API開発ガイド

## 目次

1. [APIの基本構造](#apiの基本構造)
2. [Swagger JSDocの書き方](#swagger-jsdocの書き方)
3. [データ型とスキーマ](#データ型とスキーマ)
4. [エラーハンドリング](#エラーハンドリング)
5. [認証とセキュリティ](#認証とセキュリティ)
6. [テストの実装](#テストの実装)
7. [API設計のベストプラクティス](#api設計のベストプラクティス)

## APIの基本構造

### 現在のエンドポイント

| エンドポイント | メソッド | 説明 | レスポンス |
|-------------|---------|------|-----------|
| `/api/hello` | GET | 簡単なhelloメッセージを返す | `{"message": "Hello, world!"}` |
| `/api/status` | GET | サーバーのステータス情報を返す | `{"status": "running", "uptime": 123.45, "timestamp": "2024-01-01T12:00:00.000Z", "version": "1.0.0", "environment": "development"}` |

### 基本的なルート構造

```javascript
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});
```

## Swagger JSDocの書き方

### 基本的な構文

```javascript
/**
 * @swagger
 * /api/endpoint:
 *   get:
 *     summary: エンドポイントの概要
 *     description: エンドポイントの詳細説明
 *     tags: [タグ名]
 *     parameters:
 *       - in: query
 *         name: param_name
 *         schema:
 *           type: string
 *         description: パラメータの説明
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
```

### 実用的な例

#### GETエンドポイント（クエリパラメータ付き）

```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: ユーザー一覧を取得
 *     description: 登録されているユーザーの一覧を取得します
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: 取得するユーザー数の上限
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: 取得開始位置
 *     responses:
 *       200:
 *         description: ユーザー一覧の取得成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                 total:
 *                   type: integer
 *       400:
 *         description: 不正なリクエスト
 */
```

#### POSTエンドポイント（リクエストボディ付き）

```javascript
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: 新しいユーザーを作成
 *     description: 新しいユーザーを作成します
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: ユーザー名
 *               email:
 *                 type: string
 *                 format: email
 *                 description: メールアドレス
 *               age:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 150
 *                 description: 年齢（任意）
 *     responses:
 *       201:
 *         description: ユーザーの作成成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: 不正なリクエストデータ
 *       409:
 *         description: メールアドレスが既に存在
 */
```

## データ型とスキーマ

### 基本的なデータ型

| Swagger型 | JavaScript型 | 説明 |
|-----------|-------------|------|
| `string` | String | 文字列 |
| `integer` | Number | 整数 |
| `number` | Number | 数値（小数点含む） |
| `boolean` | Boolean | 真偽値 |
| `array` | Array | 配列 |
| `object` | Object | オブジェクト |

### フォーマット指定

```javascript
// 日付
createdAt:
  type: string
  format: date-time

// メールアドレス
email:
  type: string
  format: email

// URL
website:
  type: string
  format: uri
```

### 再利用可能なスキーマ

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ユーザーID
 *         name:
 *           type: string
 *           description: ユーザー名
 *         email:
 *           type: string
 *           format: email
 *           description: メールアドレス
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 作成日時
 */
```

## エラーハンドリング

### 標準的なエラーレスポンス

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: エラーメッセージ
 *         code:
 *           type: string
 *           description: エラーコード
 *         details:
 *           type: object
 *           description: エラーの詳細情報
 */
```

### エラーハンドリングの実装例

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    const errorResponse = {
        error: err.message || 'Internal Server Error',
        code: err.code || 'INTERNAL_ERROR',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };
    
    res.status(statusCode).json(errorResponse);
});
```

## 認証とセキュリティ

### JWT認証の実装

```javascript
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: 認証トークンが無効または不正
 */

/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: 保護されたエンドポイント
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
```

## テストの実装

### JestとSupertest

```javascript
const request = require('supertest');
const app = require('../index');

describe('API Tests', () => {
    test('GET /api/hello should return hello message', async () => {
        const response = await request(app)
            .get('/api/hello')
            .expect(200);
        
        expect(response.body).toEqual({
            message: 'Hello, world!'
        });
    });
});
```

## API設計のベストプラクティス

### 1. RESTful設計

- **GET**: リソースの取得
- **POST**: リソースの作成
- **PUT**: リソースの更新（全体）
- **PATCH**: リソースの部分更新
- **DELETE**: リソースの削除

### 2. HTTPステータスコードの使用

| コード | 説明 | 使用場面 |
|--------|------|----------|
| 200 | OK | 成功 |
| 201 | Created | 作成成功 |
| 400 | Bad Request | 不正なリクエスト |
| 401 | Unauthorized | 認証エラー |
| 403 | Forbidden | 権限エラー |
| 404 | Not Found | リソースが見つからない |
| 500 | Internal Server Error | サーバーエラー |

### 3. 一貫性のあるレスポンス形式

```javascript
// 成功時
{
    "data": {...},
    "message": "Success",
    "timestamp": "2024-01-01T12:00:00Z"
}

// エラー時
{
    "error": "Error message",
    "code": "ERROR_CODE",
    "timestamp": "2024-01-01T12:00:00Z"
}
```

### 4. バージョニング

```javascript
// URLパスでのバージョニング
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// ヘッダーでのバージョニング
app.use((req, res, next) => {
    const version = req.headers['api-version'] || 'v1';
    req.apiVersion = version;
    next();
});
```

## まとめ

このガイドを参考に、一貫性があり、ドキュメントが充実したAPIを構築してください。Swagger JSDocを適切に使用することで、自動的に最新のAPIドキュメントを生成できます。