import { useState, useEffect } from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './App.css'

function App() {

  const [usuario, setUsuario] = useState([])
  const [tablausuario, settablaUsuario] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const peticionGet = async () => {
    await axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        setUsuario(response.data)
        settablaUsuario(response.data)
      }).catch(error => {
        console.log(error)
      })
  }

  // captando lo escrito
  const handleChange = e => {
    setBusqueda(e.target.value)
    filtrar(e.target.value)
  }
  // filtrado de busqueda
  const filtrar = (terminoDeBusqueda) => {
    let resultadosBusqueda = tablausuario.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(terminoDeBusqueda.toLowerCase())
        || elemento.company.name.toString().toLowerCase().includes(terminoDeBusqueda.toLowerCase())) {
        return elemento
      }
    })
    setUsuario(resultadosBusqueda)
  }

  useEffect(() => {

    peticionGet()

  }, [])

  return (
    <div className=" App">

      {/* buscador */}
      <div className='containerInput'>
        <input className='form-control inputBuscar'
          value={busqueda}
          placeholder='Busqueda por nombre o Empresa'
          onChange={handleChange} />


        <button className='btn btn-succes' >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className='table-sm table-responsive'>
        <table className='table'>
          <thead>
            <tr className='table-primary'>
              <th >Codigo</th>
              <th>Descripcion</th>
              <th>Telefono</th>
              <th>Nombre de usuario</th>
              <th>Correo</th>
              <th>Sitio web</th>
              <th>Vastago</th>
              <th>Tubo</th>
            </tr>
          </thead>
          <tbody>
            {usuario && usuario.map((usuario) => (
              <tr key={usuario.id}>
                <td className='table-info'>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.phone}</td>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>{usuario.website}</td>
                <td>{usuario.address.city}</td>
                <td>{usuario.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  )
}






export default App
