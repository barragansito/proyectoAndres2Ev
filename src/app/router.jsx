import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { AdminPage } from '../features/admin/pages/AdminPage'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { DataPage } from '../features/dashboard/pages/DataPage'
import { InventoryPage } from '../features/dashboard/pages/InventoryPage'
import { MapPage } from '../features/dashboard/pages/MapPage'
import { RadioPage } from '../features/dashboard/pages/RadioPage'
import { StatPage } from '../features/dashboard/pages/StatPage'
import { AdminRoute } from '../routes/AdminRoute'
import { ProtectedRoute } from '../routes/ProtectedRoute'
import { PublicRoute } from '../routes/PublicRoute'
import { routerBasePath } from '../utils/basePath'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/stat" replace /> },
      { path: 'stat', element: <StatPage /> },
      { path: 'inv', element: <InventoryPage /> },
      { path: 'data', element: <DataPage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'radio', element: <RadioPage /> },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to="/stat" replace /> },
], {
  basename: routerBasePath,
})
