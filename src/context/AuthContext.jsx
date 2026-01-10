// AuthContext is deprecated: app now uses Clerk for authentication.
// This file is preserved as a lightweight stub to avoid breaking imports.

import { createContext, useContext } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  // Return a minimal, read-only stub. Prefer Clerk hooks (useUser/useClerk) instead.
  return {
    user: null,
    sessionToken: null,
    loading: false,
    login: async () => ({ success: false, message: 'Local auth disabled; use Clerk' }),
    register: async () => ({ success: false, message: 'Local auth disabled; use Clerk' }),
    logout: async () => {},
    isAuthenticated: false
  }
}

export const AuthProvider = ({ children }) => {
  // No-op provider to keep compatibility with any remaining imports
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

