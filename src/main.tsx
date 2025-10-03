import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { LearnPage } from '@/pages/LearnPage'
import { CertificatePage } from '@/pages/CertificatePage'

// Lazy load the app component
const QwertyFlowApp = lazy(() => import('@/components/QwertyFlowApp'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/learn",
    element: <LearnPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/certificate",
    element: <CertificatePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/app",
    element: (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400">Memuat aplikasi...</p>
          </div>
        </div>
      }>
        <QwertyFlowApp />
      </Suspense>
    ),
    errorElement: <RouteErrorBoundary />,
  },
]);

// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)
   