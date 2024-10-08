import React, { useState } from 'react'
import { Search, Users, Mail, Settings as SettingsIcon, BarChart } from 'lucide-react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import EmailFinder from './components/EmailFinder'
import EmailVerifier from './components/EmailVerifier'
import Settings from './components/Settings'
import Reports from './components/Reports'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'emailFinder':
        return <EmailFinder />
      case 'emailVerifier':
        return <EmailVerifier />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App