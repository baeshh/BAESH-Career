import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type AuthContextValue = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const STORAGE_KEY = 'baesh-auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      if (isAuthenticated) localStorage.setItem(STORAGE_KEY, '1')
      else localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [isAuthenticated])

  const login = useCallback(() => setIsAuthenticated(true), [])
  const logout = useCallback(() => setIsAuthenticated(false), [])

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


