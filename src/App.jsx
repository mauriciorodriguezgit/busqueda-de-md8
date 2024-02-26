
import { useState, useEffect } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import Header from './assets/header';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Función para alternar entre modos claro y oscuro
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);}

    useEffect(() => {
      // Actualizar el body con la clase dark o light según el modo
      if (darkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }
    }, [darkMode]);


    const peticionGet = async () => {
      try {
        const response = await axios.get("https://raw.githubusercontent.com/mauriciorodriguezgit/busqueda-de-md8/main/src/assets/planos.json");
        setUsuarios(response.data.productos);
        setTablaUsuarios(response.data.productos);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const handleChange = e => {
      setBusqueda(e.target.value);
      filtrar(e.target.value);
    };

    const filtrar = (terminoDeBusqueda) => {
      let resultadosBusqueda = tablaUsuarios.filter((elemento) => {
        return (
          elemento.codigo.toString().toLowerCase().includes(terminoDeBusqueda.toLowerCase()) ||
          elemento.descripcion.toString().toLowerCase().includes(terminoDeBusqueda.toLowerCase())
        );
      });
      setUsuarios(resultadosBusqueda);
    };

    const handleBuscarClick = () => {
      filtrar(busqueda);
    };

    useEffect(() => {
      peticionGet();
    }, []);

    return (

      <div className='appt'>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="App">
          {/* Buscador */}
          <div className='containerInput'>
            <input
              className='form-control inputBuscar'
              value={busqueda}
              placeholder='Búsqueda por código o descripción'
              onChange={handleChange}
            />

          </div>

          <div className='table-sm table-responsive  '>
            <table className='table'>
              <thead>
                <tr className='table'>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Vástago 1</th>
                  <th>Vástago 2</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className='table-light'>{usuario.codigo}</td>
                    <td>{usuario.descripcion}</td>
                    <td>{Array.isArray(usuario.vastago) ? usuario.vastago[0] : usuario.vastago}</td>
                    <td>{Array.isArray(usuario.vastago) && usuario.vastago.length > 1 ? usuario.vastago[1] : null}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  export default App;

