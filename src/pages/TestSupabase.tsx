import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'

// Definir el tipo para los datos de case_stock
interface CaseStock {
  id: string; // En la BD real será uuid
  case_id: number;
  phone_model_id: number;
  stock: number;
}

function Page() {
  const [caseStockData, setCaseStockData] = useState<CaseStock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getCaseStock() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('case_stock')
          .select('*')
        
        if (error) {
          setError(error.message)
          console.error('Error fetching data:', error)
        } else {
          setCaseStockData(data || [])
          console.log('Data fetched successfully:', data)
        }
      } catch (err) {
        setError('Error inesperado al obtener los datos')
        console.error('Unexpected error:', err)
      } finally {
        setLoading(false)
      }
    }

    getCaseStock()
  }, [])

  if (loading) {
    return <div>Cargando datos de case_stock...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2>Prueba de Supabase - Tabla case_stock</h2>
      <p>Total de registros: {caseStockData.length}</p>
      
      {caseStockData.length === 0 ? (
        <p>No hay datos en la tabla case_stock</p>
      ) : (
        <ul>
          {caseStockData.map((item) => (
            <li key={item.id}>
              ID: {item.id} | Case ID: {item.case_id} | Phone Model ID: {item.phone_model_id} | Stock: {item.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Page