import { NavLink, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import EntryPortal from './pages/EntryPortal'
import CloneHub from './pages/CloneHub'
import Profile from './pages/Profile'
import Lounge from './pages/Lounge'
import Networking from './pages/Networking'
import Jobs from './pages/Jobs'
import Notifications from './pages/Notifications'
import RequireAuth from './components/RequireAuth'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Preview from './pages/Preview'
import SignupComplete from './pages/SignupComplete'
import Forgot from './pages/Forgot'
import ResetPassword from './pages/ResetPassword'

export function RouterProvider() {
  return (
    <Routes>
      {/* 공개 경로 */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* 보호 경로: 로그인 후 접근 */}
      <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
        <Route path="/onboarding" element={<EntryPortal />} />
        <Route path="/signup/complete" element={<SignupComplete />} />
        <Route path="/clone" element={<CloneHub />} />
        <Route path="/hub" element={<CloneHub />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lounge" element={<Lounge />} />
        <Route path="/networking" element={<Networking />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  )
}

export function Nav() {
  const items = [
    { to: '/', label: 'Entry' },
    { to: '/hub', label: '클론 허브' },
    { to: '/profile', label: '프로필' },
    { to: '/lounge', label: '라운지' },
    { to: '/networking', label: '네트워킹' },
    { to: '/jobs', label: '채용' },
    { to: '/notifications', label: '알림' },
  ]
  return (
    <nav className="nav">
      {items.map(i => (
        <NavLink key={i.to} to={i.to} className={({ isActive }) => isActive ? 'active' : ''}>
          {i.label}
        </NavLink>
      ))}
    </nav>
  )
}


