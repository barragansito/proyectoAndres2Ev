import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { DataPage } from '../features/dashboard/pages/DataPage'
import { InventoryPage } from '../features/dashboard/pages/InventoryPage'
import { MapPage } from '../features/dashboard/pages/MapPage'
import { RadioPage } from '../features/dashboard/pages/RadioPage'
import { StatPage } from '../features/dashboard/pages/StatPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/stat" replace /> },
      { path: 'stat', element: <StatPage /> },
      { path: 'inv', element: <InventoryPage /> },
      { path: 'data', element: <DataPage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'radio', element: <RadioPage /> },
    ],
  },
])
