import { NavLink, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import EntryPortal from './pages/EntryPortal'
import CloneHub from './pages/CloneHub'
import Profile from './pages/Profile'
import Lounge from './pages/Lounge'
import Networking from './pages/Networking'
import JobDetail from './pages/JobDetail'
import MatchingResults from './pages/MatchingResults'
import MyApplications from './pages/MyApplications'
import CompanyProfile from './pages/CompanyProfile'
import Notifications from './pages/Notifications'
import RequireAuth from './components/RequireAuth'
import Landing from './pages/Landing'
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
      <Route path="/" element={<Landing />} />
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
        <Route path="/lounge/jobs/:id" element={<JobDetail />} />
        <Route path="/lounge/matching" element={<MatchingResults />} />
        <Route path="/lounge/applications" element={<MyApplications />} />
        <Route path="/lounge/activities/:id" element={<JobDetail />} />
        <Route path="/networking" element={<Networking />} />
        <Route path="/companies/:id" element={<CompanyProfile />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  )
}

export function Nav() {
  const items = [
    { to: '/hub', label: '클론' },
    { to: '/profile', label: '프로필' },
    { to: '/lounge', label: '라운지' },
    { to: '/networking', label: '네트워킹' },
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


