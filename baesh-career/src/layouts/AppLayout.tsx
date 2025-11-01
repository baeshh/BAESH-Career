import { Outlet, useNavigate } from 'react-router-dom'
import { Nav } from '../router'
import Brand from '../components/Brand'
import { useAuth } from '../auth/AuthContext'

export default function AppLayout() {
  const { logout } = useAuth()
  const nav = useNavigate()
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <header className="panel header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Brand />
          <span className="badge">BAESH Career</span>
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


