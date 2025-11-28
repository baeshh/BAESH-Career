import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Nav } from '../router'
import Brand from '../components/Brand'
import { useAuth } from '../auth/AuthContext'

export default function AppLayout() {
  const { logout } = useAuth()
  const nav = useNavigate()
  const location = useLocation()
  const isNotificationsPage = location.pathname === '/notifications'
  
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <header className="panel header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Brand />
          <button
            onClick={() => nav('/notifications')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(30, 111, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill={isNotificationsPage ? 'var(--brand)' : 'none'} 
              stroke={isNotificationsPage ? 'var(--brand)' : 'var(--muted)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19.5 14.5c0 .38-.15.74-.4 1l-1.1 1.1c-.26.25-.62.4-1 .4H7c-.38 0-.74-.15-1-.4l-1.1-1.1c-.25-.26-.4-.62-.4-1v-3.5c0-1.1.9-2 2-2h11c1.1 0 2 .9 2 2v3.5z" />
              <path d="M9 10h6" />
              <path d="M12 7v3" />
            </svg>
            {/* 알림 배지 (새 알림이 있을 때) */}
            <span style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 8,
              height: 8,
              borderRadius: 999,
              background: '#EF4444',
              border: '2px solid var(--panel)'
            }} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Nav />
          <button className="badge" onClick={() => { logout(); nav('/', { replace: true }) }}>로그아웃</button>
        </div>
      </header>

      <main className="container" style={{ width: '100%', display: 'block' }}>
        <Outlet />
      </main>
    </div>
  )
}


