import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

const Settings = () => {
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    // Cargar la API key guardada al montar el componente
    const savedApiKey = localStorage.getItem('instantlyApiKey')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Guardar la API key en el localStorage
    localStorage.setItem('instantlyApiKey', apiKey)
    alert('API key guardada correctamente')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Configuración</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiKey">
            API Key de Instantly
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apiKey"
            type="password"
            placeholder="Ingresa tu API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            type="submit"
          >
            <Save size={20} className="mr-2" />
            Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings