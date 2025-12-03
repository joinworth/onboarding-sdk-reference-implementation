import { useMemo, useState, type ReactElement } from 'react'
import { Outlet } from 'react-router'
import Header from '@/components/header/Header'
import { AppContext } from './context/app'

const App = (): ReactElement => {
  const [token, setToken] = useState('')
  const value = useMemo(() => ({ token, setToken }), [token])
  return (
    <AppContext.Provider value={value}>
      <div className="flex flex-col h-screen w-screen">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
