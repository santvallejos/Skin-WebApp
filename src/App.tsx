import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-20 p-4"> {/* Añadimos margen superior para que el contenido no quede debajo del navbar */}
        <h1 className='bg-red-500'>Skin</h1>
        {/* Aquí puedes añadir el resto del contenido de tu aplicación */}
        <section id="seccion1" className="py-10">
          <h2 className="text-2xl font-bold">Sección 1</h2>
          <p>Contenido de la sección 1</p>
        </section>
        <section id="seccion2" className="py-10">
          <h2 className="text-2xl font-bold">Sección 2</h2>
          <p>Contenido de la sección 2</p>
        </section>
      </div>
    </>
  )
}

export default App
