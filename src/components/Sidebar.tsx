import React from 'react'
import { Search, Users, Mail, Settings, BarChart } from 'lucide-react'

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Search },
    { id: 'emailFinder', name: 'Buscador de Emails', icon: Users },
    { id: 'emailVerifier', name: 'Verificador de Emails', icon: Mail },
    { id: 'reports', name: 'Reportes', icon: BarChart },
    { id: 'settings', name: 'Configuración', icon: Settings },
  ]

  return (
    <aside className="bg-white w-64 p-6 shadow-lg">
      <nav>
        <ul className="space-y-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 w-full p-2 rounded ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar