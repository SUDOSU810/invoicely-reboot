import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Layout from './components/Layout'

// Pages
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'
import SignInPage from './pages/SignInPage'
import CreateAccountPage from './pages/CreateAccountPage'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="invoice-app-theme">
      <Routes>
        {/* Public pages without layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        
        {/* App pages with layout and navigation */}
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/history" element={<Layout><HistoryPage /></Layout>} />
        <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
