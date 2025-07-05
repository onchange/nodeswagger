# デプロイメントガイド

## 目次

1. [概要](#概要)
2. [ローカル開発環境](#ローカル開発環境)
3. [Docker環境](#docker環境)
4. [Heroku](#heroku)
5. [AWS](#aws)
6. [環境変数の設定](#環境変数の設定)
7. [パフォーマンスの最適化](#パフォーマンスの最適化)
8. [監視とログ](#監視とログ)
9. [セキュリティ設定](#セキュリティ設定)

## 概要

このプロジェクトは様々な環境にデプロイできるよう設計されています。環境に応じて適切な設定を選択してください。

## ローカル開発環境

### 前提条件

- Node.js v14以上
- npm または yarn

### セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. アプリケーションの起動
```bash
npm start
```

3. 動作確認
```bash
# APIのテスト
curl http://localhost:3000/api/hello

# Swagger UIの確認
# ブラウザで http://localhost:3000/api-docs を開く
```

## Docker環境

### Dockerfileの作成

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

### docker-compose.ymlの作成

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/hello"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Docker環境での起動

```bash
# イメージのビルド
docker build -t nodeswagger .

# コンテナの起動
docker run -p 3000:3000 nodeswagger

# docker-composeでの起動
docker-compose up -d
```

## Heroku

### 前提条件

- Heroku CLI
- Git

### デプロイ手順

1. Herokuアプリケーションの作成
```bash
heroku create your-app-name
```

2. 環境変数の設定
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
```

3. デプロイ
```bash
git push heroku main
```

4. 動作確認
```bash
heroku open
```

### Procfileの作成

```
web: npm start
```

### package.jsonの設定

```json
{
  "scripts": {
    "start": "node index.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

## AWS

### AWS EC2での デプロイ

1. EC2インスタンスの作成
```bash
# Ubuntu 20.04 LTSを使用
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. アプリケーションの配置
```bash
# アプリケーションをクローン
git clone https://github.com/your-username/nodeswagger.git
cd nodeswagger

# 依存関係のインストール
npm install --production

# PM2での起動
npm install -g pm2
pm2 start index.js --name nodeswagger
pm2 startup
pm2 save
```

3. Nginxの設定
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### AWS ECSでのデプロイ

1. ECRリポジトリの作成
```bash
aws ecr create-repository --repository-name nodeswagger
```

2. Dockerイメージのプッシュ
```bash
# ECRへのログイン
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# イメージのタグ付け
docker tag nodeswagger:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/nodeswagger:latest

# イメージのプッシュ
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/nodeswagger:latest
```

3. ECSタスク定義の作成
```json
{
  "family": "nodeswagger-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "nodeswagger",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/nodeswagger:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "PORT",
          "value": "3000"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/nodeswagger",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

## 環境変数の設定

### 必須の環境変数

```env
NODE_ENV=production
PORT=3000
```

### 推奨の環境変数

```env
# アプリケーション設定
APP_NAME=nodeswagger
API_VERSION=1.0.0

# セキュリティ設定
CORS_ORIGIN=https://your-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ログ設定
LOG_LEVEL=info
LOG_FORMAT=json

# 監視設定
HEALTH_CHECK_INTERVAL=30000
```

### 環境別の設定例

```javascript
// config/environment.js
module.exports = {
  development: {
    port: 3000,
    logLevel: 'debug',
    corsOrigin: 'http://localhost:3000'
  },
  production: {
    port: process.env.PORT || 3000,
    logLevel: 'info',
    corsOrigin: process.env.CORS_ORIGIN || false
  }
};
```

## パフォーマンスの最適化

### 1. Express.jsの最適化

```javascript
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// セキュリティヘッダーの設定
app.use(helmet());

// gzip圧縮
app.use(compression());

// 静的ファイルの配信最適化
app.use(express.static('public', {
  maxAge: '1d',
  etag: true
}));
```

### 2. クラスタリング

```javascript
// cluster.js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  require('./index.js');
}
```

### 3. レート制限

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 100, // 最大100リクエスト
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

## 監視とログ

### 1. ログの設定

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### 2. ヘルスチェック

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

### 3. メトリクスの収集

```javascript
const prometheus = require('prom-client');

// デフォルトメトリクスの収集
prometheus.collectDefaultMetrics();

// カスタムメトリクス
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code']
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});
```

## セキュリティ設定

### 1. HTTPS の設定

```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
```

### 2. CORS の設定

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN || false,
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### 3. セキュリティヘッダー

```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));
```

## まとめ

このガイドを参考に、適切な環境でアプリケーションをデプロイしてください。本番環境では、セキュリティ、パフォーマンス、監視の設定を忘れずに行ってください。

各環境に応じた設定を適切に行うことで、安定したAPIサービスを提供できます。