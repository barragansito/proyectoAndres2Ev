import { Outlet } from 'react-router-dom'
import { RadioPlayerProvider } from '../../features/radio/context/RadioPlayerProvider'
import { CRTOverlay } from '../ui/CRTOverlay'
import { Footer } from './Footer'
import { Header } from './Header'
import { NavTabs } from './NavTabs'
import { Sidebar } from './Sidebar'

export function AppShell() {
  return (
    <RadioPlayerProvider>
      <CRTOverlay />
      <div className="wrapper">
        <Header />
        <NavTabs />

        <main className="grid-container">
          <Sidebar />
          <section className="content">
            <Outlet />
          </section>
        </main>

        <Footer />
      </div>
    </RadioPlayerProvider>
  )
}
