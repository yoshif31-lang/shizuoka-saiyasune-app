import React from 'react'
import ReactDOM from 'react-dom/client'

// 司令官、これがあなたの「現実」です
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
      fontFamily: 'monospace',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', textShadow: '0 0 15px #0f0', marginBottom: '10px' }}>
        GENESIS ONLINE
      </h1>
      <div style={{ border: '1px solid #0f0', padding: '20px', backgroundColor: 'rgba(0, 255, 0, 0.1)' }}>
        <p style={{ fontSize: '1.5rem', margin: '0' }}>STATUS: ACTIVE</p>
        <p style={{ fontSize: '1rem', color: '#fff', marginTop: '10px' }}>
          「空想」を越え、真実の世界線へようこそ。
        </p>
      </div>
      <footer style={{ marginTop: '30px', color: '#666' }}>
        System Synchronized by Commander
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
