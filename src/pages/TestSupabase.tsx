import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase'

// Definir el tipo para los datos de case_stock con información de las tablas relacionadas
interface Case {
  id: string;
  name: string;
  price: number;
  discount: number | null;
  new_price: number | null;
  images: string[];
  stock: boolean;
}

interface Stock {
  id: string;
  cases: { name: string } | null;
  phone_model: { name: string } | null;
}

function Page() {
  const [caseData, setCaseData] = useState<Case[]>([])
  const [stockData, setStockData] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getCaseStock() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('cases')
          .select(`
            id,
            name,
            price,
            discount,
            new_price,
            images,
            stock
          `)

        const { data: stockData, error: stockError } = await supabase
          .from('case_stock')
          .select(`
              id,
              cases!case_id (
                name
              ),
              phone_model!phone_model_id (
                name
              )
            `)

        console.log('Supabase response:', { data, error })
        console.log('Stock data response:', { stockData, stockError })
        
        if (error) {
          setError(error.message)
          console.error('Error fetching cases data:', error)
        } else if (stockError) {
          setError(stockError.message)
          console.error('Error fetching stock data:', stockError)
        } else {
          setCaseData(data || [])
          setStockData((stockData || []) as unknown as Stock[])
          console.log('Cases data fetched successfully:', data)
          console.log('Stock data fetched successfully:', stockData)
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
      <h2>Prueba de Supabase - Tabla cases</h2>
      <p>Total de registros de cases: {caseData.length}</p>

      {caseData.length === 0 ? (
        <p>No hay datos en la tabla cases</p>
      ) : (
        <ul>
          {caseData.map((item) => (
            <li key={item.id}>
              ID: {item.id} |
              Name: {item.name} |
              Price: {item.price} |
              Discount: {item.discount ?? 'N/A'} |
              New Price: {item.new_price ?? 'N/A'} |
              {/* Recorre todas las imagenes y muestralas con img */}
              Images: {item.images.length > 0 ? item.images.map((img, index) => (
                <img key={index} src={img} alt={`Image ${index + 1}`} style={{ width: '50px', marginRight: '5px' }} />
              )) : 'N/A'} |
              Stock: {item.stock ? 'En stock' : 'Sin stock'}
            </li>
          ))}
        </ul>
      )}

      <h2>Stock de todos los productos</h2>
      <p>Total de registros de stock: {stockData.length}</p>

      {stockData.length === 0 ? (
        <p>No hay datos en la tabla stock</p>
      ) : (
        <ul>
          {stockData.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
              <strong>Stock ID:</strong> {item.id} <br />
              <strong>Producto:</strong> {item.cases?.name ?? 'N/A'} <br />
              <strong>Modelo de teléfono:</strong> {item.phone_model?.name ?? 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Page