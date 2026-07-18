import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import Cursor from './components/Cursor/Cursor'
import IntroReveal from './components/IntroReveal/IntroReveal'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import { ThemeProvider } from './contexts/ThemeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <IntroReveal />
        <ScrollProgress />
        <Cursor />
        <App />
      </MotionConfig>
    </ThemeProvider>
  </React.StrictMode>,
)
