import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../features/auth/hooks/useAuth'
import { RadioPlayerProvider } from '../../features/radio/context/RadioPlayerProvider'
import { useTabChangeSound } from '../../features/audio/hooks/useTabChangeSound'
import { CRTOverlay } from '../ui/CRTOverlay'
import { Footer } from './Footer'
import { Header } from './Header'
import { NavTabs } from './NavTabs'
import { Sidebar } from './Sidebar'
import { StatusHud } from './StatusHud'

export function AppShell() {
  const { displayName, isAdmin, logout } = useAuth()
  const [isUiSoundEnabled, setIsUiSoundEnabled] = useState(() => {
    return localStorage.getItem('ui-sound-enabled') !== 'false'
  })

  useEffect(() => {
    localStorage.setItem('ui-sound-enabled', String(isUiSoundEnabled))
  }, [isUiSoundEnabled])

  useTabChangeSound(isUiSoundEnabled)

  return (
    <RadioPlayerProvider>
      <CRTOverlay />
      <div className="pipboy-shell">
        <div className="pipboy-screen">
          <div className="wrapper">
            <Header
              isUiSoundEnabled={isUiSoundEnabled}
              onToggleUiSound={() => setIsUiSoundEnabled((prev) => !prev)}
              userDisplayName={displayName}
              isAdmin={isAdmin}
              onLogout={logout}
            />
            <NavTabs />
            <StatusHud />

            <main className="grid-container">
              <Sidebar />
              <section className="content">
                <Outlet />
              </section>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </RadioPlayerProvider>
  )
}
