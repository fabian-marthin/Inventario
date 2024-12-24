import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imgSalir from './img/salir.png'
import Grafica from './Grafica';

function Inventario() {

  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

    // Obtener productos
    useEffect(() => {
        axios.get("http://localhost:5000/api/productos")
            .then(res => setProductos(res.data))
            .catch(err => console.error(err));
    }, []);

    // Buscadores

    const [busqueda, setBusqueda] = useState('');
        const resultados = productos.filter(item =>
          item.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );  
    
        const categorias = [...new Set(resultados.map(item => item.caracteristica))]
      
        const totalCategorias = resultados.reduce((acc, item)=>{
          if(!acc[item.caracteristica]){
            acc[item.caracteristica] = 0;
          }
          acc[item.caracteristica] += item.unidades;
    
          return acc;
        }, {});
    
        const nombresProductos = resultados.map (producto => producto.nombre);
        console.log(nombresProductos);
    
        const unidadesProductos = resultados.map (unid => unid.unidades);
    
    return (
      <section className='adminContainer'>

        <div className='contenedorGrafica'>
          <div>
            <h3>Unidades por Categoria</h3>
            <Grafica 
              categorias={categorias} 
              totalCategorias={Object.values(totalCategorias)} 
            />
          </div>
          <div>
            <h3>Unidades por Producto</h3>
            <Grafica 
              categorias={nombresProductos} 
              totalCategorias={Object.values(unidadesProductos)} 
            />
          </div>
        </div>
        

        <div className='inputBuscar'>
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
          

        <ul>

          {resultados.length > 0 ? (
            <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Referencia</th>
                    <th>Nombre</th>
                    <th>Carecteristica</th>
                    <th>Precio </th>
                    <th>Unidades </th>
                    <th>Precio Total </th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nombre}</td>
                      <td>{item.caracteristica}</td>
                      <td>${item.precioVenta}</td>
                      <td>{item.unidades}</td>
                      <td>${item.precioVenta*item.unidades}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          ) : (
            <li className='mensajeSinResultados'>
              No se encontraron resultados
            </li>
          )}
          
        </ul>

        <button className='buttonSalir' onClick={()=>{
          navigate('/');
          window.location.reload();
          }
        }>
          <img src={imgSalir}></img>
        </button>

       
        
      </section>

    );
  }

export default Inventario;