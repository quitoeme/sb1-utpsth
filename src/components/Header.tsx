import React from 'react'
import { Mail } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail size={24} />
          <h1 className="text-2xl font-bold">Instantly API UI</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200">Documentación</a></li>
            <li><a href="#" className="hover:text-blue-200">Soporte</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header