import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import App from './App.tsx'
// import { injectTelegramMocks } from './telegram-mock/injectTelegramMocks.ts';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { ToastContainer } from "react-toastify";


if (import.meta.env.DEV) {
  // injectTelegramMocks();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer limit={6} draggablePercent={60} newestOnTop/>
      <App />
    </AuthProvider>
  </StrictMode>,
)
