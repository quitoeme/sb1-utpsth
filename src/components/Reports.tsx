import React, { useState, useEffect } from 'react'
import { BarChart, LineChart, PieChart, Calendar } from 'lucide-react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Reports: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 30)))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<string>('')
  const [reportData, setReportData] = useState<any>(null)

  const metrics = [
    { id: 'opens', name: 'Aperturas' },
    { id: 'clicks', name: 'Clics' },
    { id: 'bounces', name: 'Rebotes' },
    { id: 'unsubscribes', name: 'Desuscripciones' },
    { id: 'conversions', name: 'Conversiones' },
    { id: 'revenue', name: 'Ingresos' }
  ]

  useEffect(() => {
    // Aquí cargaríamos las campañas desde la API de Instantly
    // Por ahora, usaremos datos de ejemplo
    setCampaigns([
      { id: 'camp1', name: 'Campaña 1' },
      { id: 'camp2', name: 'Campaña 2' },
      { id: 'camp3', name: 'Campaña 3' }
    ])
  }, [])

  const handleMetricToggle = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(selectedMetrics.filter(id => id !== metricId))
    } else if (selectedMetrics.length < 4) {
      setSelectedMetrics([...selectedMetrics, metricId])
    }
  }

  const generateReport = () => {
    // Aquí llamaríamos a la API de Instantly para obtener los datos reales
    // Por ahora, generaremos datos de ejemplo
    const data = {
      labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'],
      datasets: selectedMetrics.map(metric => ({
        label: metrics.find(m => m.id === metric)?.name,
        data: Array(5).fill(0).map(() => Math.floor(Math.random() * 100)),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      }))
    }
    setReportData(data)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reportes</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rango de fechas</label>
          <div className="flex space-x-4">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Campaña</label>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona una campaña</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Métricas (selecciona hasta 4)</label>
          <div className="flex flex-wrap -mx-2">
            {metrics.map(metric => (
              <div key={metric.id} className="px-2 mb-2">
                <button
                  onClick={() => handleMetricToggle(metric.id)}
                  className={`py-2 px-4 rounded ${
                    selectedMetrics.includes(metric.id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {metric.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={generateReport}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generar Reporte
        </button>
      </div>
      {reportData && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Resultados del Reporte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Gráfico de Barras</h4>
              <Bar data={reportData} />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Gráfico de Líneas</h4>
              <Line data={reportData} />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Gráfico Circular</h4>
              <Pie data={{
                labels: reportData.datasets.map((ds: any) => ds.label),
                datasets: [{
                  data: reportData.datasets.map((ds: any) => ds.data.reduce((a: number, b: number) => a + b, 0)),
                  backgroundColor: reportData.datasets.map((ds: any) => ds.backgroundColor),
                }]
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports