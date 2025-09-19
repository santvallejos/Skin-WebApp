import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'

/* 
0: Object { id: "47df0713-add9-40f8-b0d9-64a3c8f46a4d", cases: {…}, phone_model: {…} }
cases: Object { name: "Fire Matte" }
id: "47df0713-add9-40f8-b0d9-64a3c8f46a4d"
phone_model: Object { name: "iPhone 11 " }
<prototype>: Object { … }
*/

// Definir el tipo para los datos de case_stock con información de las tablas relacionadas
interface CaseStock {
  id: string; // En la BD real será uuid
  cases: { name: string } | null;
  phone_model: { name: string } | null;
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
          .select(`
            id, 
            cases!case_id (
              name
            ),
            phone_model!phone_model_id (
              name
            ),
            stock
          `)
        
        console.log('Supabase response:', { data, error })
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
              ID: {item.id} | 
                Funda: {item.cases?.name || 'Sin nombre'} | 
                Modelo: {item.phone_model?.name || 'Sin nombre'} | 
              Stock: {item.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Page