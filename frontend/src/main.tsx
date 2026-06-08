import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { injectTelegramMocks } from './telegram-mock/injectTelegramMocks.ts';
import { AuthProvider } from './providers/AuthProvider.tsx';


if (import.meta.env.DEV) {
  injectTelegramMocks();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
