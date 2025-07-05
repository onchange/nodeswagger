import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState('未確認');

  // APIのベースURL（開発時は localhost:3000）
  const API_BASE_URL = 'http://localhost:3000';

  // APIからHelloメッセージを取得
  const fetchHelloMessage = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/hello`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessage(data.message);
      setApiStatus('接続成功');
    } catch (err) {
      setError(`APIエラー: ${err.message}`);
      setApiStatus('接続失敗');
    } finally {
      setLoading(false);
    }
  };

  // APIの状態を確認
  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hello`);
      if (response.ok) {
        setApiStatus('接続成功');
      } else {
        setApiStatus('接続失敗');
      }
    } catch (err) {
      setApiStatus('接続失敗');
    }
  };

  // コンポーネントマウント時にAPI状態を確認
  useEffect(() => {
    checkApiStatus();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>NodeSwagger API Client</h1>
        <p>React フロントエンド - NodeSwagger API連携デモ</p>
      </header>

      <main className="App-main">
        <div className="api-status">
          <h2>API接続状況</h2>
          <p className={`status ${apiStatus === '接続成功' ? 'success' : 'error'}`}>
            {apiStatus}
          </p>
          <button onClick={checkApiStatus} className="check-btn">
            接続確認
          </button>
        </div>

        <div className="api-test">
          <h2>API テスト</h2>
          <button 
            onClick={fetchHelloMessage} 
            disabled={loading}
            className="test-btn"
          >
            {loading ? 'リクエスト中...' : 'Hello APIを呼び出す'}
          </button>
          
          {message && (
            <div className="message-result">
              <h3>レスポンス:</h3>
              <p className="message">{message}</p>
            </div>
          )}
          
          {error && (
            <div className="error-result">
              <h3>エラー:</h3>
              <p className="error">{error}</p>
            </div>
          )}
        </div>

        <div className="api-info">
          <h2>API 情報</h2>
          <ul>
            <li>API URL: <code>{API_BASE_URL}</code></li>
            <li>Hello エンドポイント: <code>/api/hello</code></li>
            <li>Swagger UI: <a href={`${API_BASE_URL}/api-docs`} target="_blank" rel="noopener noreferrer">
              {API_BASE_URL}/api-docs
            </a></li>
          </ul>
        </div>

        <div className="instructions">
          <h2>使用方法</h2>
          <ol>
            <li>NodeSwagger APIサーバーを起動してください (<code>npm start</code>)</li>
            <li>「接続確認」ボタンでAPI接続状況を確認</li>
            <li>「Hello APIを呼び出す」ボタンでAPIをテスト</li>
          </ol>
        </div>
      </main>
    </div>
  );
}

export default App;