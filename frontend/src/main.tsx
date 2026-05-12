import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { injectTelegramMocks } from './telegram-mock/injectTelegramMocks.ts';
import { BrowserRouter } from 'react-router-dom';


if (import.meta.env.DEV) {
  injectTelegramMocks();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
