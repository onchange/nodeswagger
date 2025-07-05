# nodeswagger

Node.js + Express + Swagger を使用したAPIドキュメント自動生成のデモプロジェクト

## 概要

このプロジェクトは、Node.js と Express.js を使用して RESTful API を構築し、Swagger を使用してAPI ドキュメントを自動生成する方法を示すサンプルアプリケーションです。

## 主な特徴

- **Express.js**: 高速で軽量なWebアプリケーションフレームワーク
- **Swagger UI**: インタラクティブなAPIドキュメント
- **swagger-jsdoc**: JSDocコメントからSwagger仕様を生成
- **swagger-ui-express**: Express.jsでSwagger UIを提供

## 必要な環境

- Node.js (v14 以上推奨)
- npm または yarn

## インストール

1. このリポジトリをクローンします：
```bash
git clone https://github.com/onchange/nodeswagger.git
cd nodeswagger
```

2. 依存関係をインストールします：
```bash
npm install
```

## 使用方法

### サーバーの起動

```bash
npm start
```

または

```bash
node index.js
```

サーバーが起動すると、以下のメッセージが表示されます：
```
Server is running at http://localhost:3000
```

### API エンドポイント

#### Hello API
- **URL**: `http://localhost:3000/api/hello`
- **メソッド**: GET
- **説明**: 簡単なhelloメッセージを返します

**レスポンス例**:
```json
{
  "message": "Hello, world!"
}
```

### API ドキュメント

Swagger UI を使用してAPIドキュメントを確認できます：

- **Swagger UI**: `http://localhost:3000/api-docs`

## プロジェクト構造

```
nodeswagger/
├── index.js          # メインのサーバーファイル
├── package.json      # プロジェクトの依存関係と設定
├── README.md         # このファイル
├── docs/            # ドキュメントファイル
│   ├── index.html   # Swagger UIのHTMLファイル
│   └── swagger.json # Swagger仕様のJSONファイル
└── .gitignore       # Gitで無視するファイルの設定
```

## 新しいエンドポイントの追加

新しいAPIエンドポイントを追加する場合：

1. `index.js` にExpressルートを追加
2. Swagger JSDocコメントを追加してドキュメントを生成

**例**:
```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: ユーザー一覧を取得
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: ユーザー一覧の配列
 */
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: '太郎' },
        { id: 2, name: '花子' }
    ]);
});
```

## 技術スタック

- **Node.js**: JavaScriptランタイム環境
- **Express.js**: Webアプリケーションフレームワーク
- **swagger-jsdoc**: JSDocからSwagger仕様を生成
- **swagger-ui-express**: Express用のSwagger UIミドルウェア

## 開発のヒント

1. **APIドキュメントの更新**: コードを変更した後、サーバーを再起動してSwagger UIで最新のドキュメントを確認してください。

2. **JSDocコメントの書き方**: Swagger仕様に従ってJSDocコメントを記述することで、自動的にAPIドキュメントが生成されます。

3. **エラーハンドリング**: 本番環境では適切なエラーハンドリングを実装してください。

## ライセンス

ISC

## 作者

作者情報が必要な場合は、`package.json` の author フィールドを更新してください。

## 貢献

このプロジェクトへの貢献を歓迎します。プルリクエストを送信する前に、以下の点をご確認ください：

1. コードが正しく動作することを確認
2. 新しいエンドポイントには適切なSwagger JSDocコメントを追加
3. README.md の更新が必要な場合は更新

## 参考リンク

- [Express.js公式ドキュメント](https://expressjs.com/)
- [Swagger公式ドキュメント](https://swagger.io/)
- [swagger-jsdoc GitHub](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express GitHub](https://github.com/scottie1984/swagger-ui-express)