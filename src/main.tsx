import React from 'react'
import ReactDOM from 'react-dom/client'

// GENESIS 司令室の最小構成
const App = () => {
  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: '#0f0', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ fontSize: '3rem', textShadow: '0 0 10px #0f0' }}>GENESIS ONLINE</h1>
      <p style={{ fontSize: '1.2rem' }}>司令官、世界線の同期に成功しました。</p>
      <div style={{ marginTop: '20px', border: '1px solid #0f0', padding: '10px' }}>
        STATUS: ACTIVE / SYNCHRONIZED
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
