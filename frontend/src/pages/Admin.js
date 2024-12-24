import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imgSalir from './img/salir.png'
import imgEliminar from './img/eliminar.png'
import imgEditar from './img/editar.png'
import axios from 'axios';
import Grafica from './Grafica';

function Admin() {

  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', caracteristica: '', precioVenta: '', unidades: '' });
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  
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
    console.log(resultados);

    const categorias = Array.from(new Set(resultados.map(item => item.caracteristica)));
    console.log(categorias);
  
    const totalCategorias = resultados.reduce((acc, item)=>{
      if(!acc[item.caracteristica]){
        acc[item.caracteristica] = 0;
      }
      acc[item.caracteristica] += item.unidades;

      return acc;
    }, {});

    const nombresProductos = resultados.map (producto => producto.nombre);

    const unidadesProductos = resultados.map (unid => unid.unidades);

    // Manejar formulario
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
      e.preventDefault();
      axios.post("http://localhost:5000/productos", form)
          .then(res => setProductos([...productos, res.data]))
          .catch(err => console.error(err));
    };

    const handleDelete = id => {
      axios.delete(`http://localhost:5000/productos/${id}`)
        .then(() => setProductos(productos.filter(p => p.id !== id)))
        .catch(err => console.error(err));
    };

    const actualizarProducto = () => {
      if (!productoSeleccionado) return;
      axios.put(`http://localhost:5000/productos/${productoSeleccionado.id}`, productoSeleccionado)
        .then(() => {
          // Actualizar la lista de productos localmente
          setProductos(productos.map(producto =>
            producto.id === productoSeleccionado.id ? productoSeleccionado : producto
          ));
          setProductoSeleccionado(null); // Limpiar selección
        })
        .catch(error => console.error(error));
    };

    

    
    return (
      <section className='adminContainer'>

        <div className='formGrafica'>
          <form className='formRegItem' onSubmit={handleSubmit}>
            <h1>Registra nuevos productos</h1>
            <input name="nombre" placeholder="Nombre Producto" onChange={handleChange} required />
            <input list='lista' name="caracteristica" placeholder="Categoria" onChange={handleChange} required />
              <datalist id='lista'>
                <option value="Electrónicos" />
                <option value="Ropa y accesorios" />
                <option value="Muebles" />
                <option value="Alimentos y bebidas" />
                <option value="Hogar y cocina" />
                <option value="Papelería y oficina" />
                <option value="Automotriz" />
                <option value="Salud y belleza" />
                <option value="Juguetes y entretenimiento" />
              </datalist>
            <input name="precioVenta" placeholder="Precio de Venta" type="number" onChange={handleChange} required />
            <input name="unidades" placeholder="Unidades" type="number" onChange={handleChange} required />
            <button type="submit" onClick={()=> alert("se guardo el producto")}>Agregar</button>
          </form>
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
                    <th>Categoria</th>
                    <th>Precio </th>
                    <th>Unidades </th>
                    <th>Valor total </th>
                    <th>Eliminar/Editar </th>
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
                      <td>
                        <button className='botonConfig' onClick={()=> handleDelete(item.id)}>
                          <img  src={imgEliminar}></img>
                        </button>
                        <button className='botonConfig' onClick={() => setProductoSeleccionado(item)}>
                          <img  src={imgEditar}></img>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          ) : (
            <li className='mensajeSinResultados'>
              No se encontraron resultados
            </li>
          )}
          
            <div className='edit'>
              {productoSeleccionado && (
                <div className='containerEdit'>
                  <h1>Editar Producto</h1>
                  <input
                    type="text"
                    value={productoSeleccionado.nombre}
                    onChange={e =>
                      setProductoSeleccionado({ ...productoSeleccionado, nombre: e.target.value })
                    }
                  />                     
                  <input
                    type="text"
                    list='listaEdit'
                    value={productoSeleccionado.caracteristica}
                    onChange={e =>
                      setProductoSeleccionado({ ...productoSeleccionado, caracteristica: e.target.value })
                    }
                  />
                      <datalist id='listaEdit'>
                        <option value="Electrónicos" />
                        <option value="Ropa y accesorios" />
                        <option value="Muebles" />
                        <option value="Alimentos y bebidas" />
                        <option value="Hogar y cocina" />
                        <option value="Papelería y oficina" />
                        <option value="Automotriz" />
                        <option value="Salud y belleza" />
                        <option value="Juguetes y entretenimiento" />
                      </datalist>
                  <input
                    type="number"
                    value={productoSeleccionado.precioVenta}
                    onChange={e =>
                      setProductoSeleccionado({ ...productoSeleccionado, precioVenta: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={productoSeleccionado.unidades}
                    onChange={e =>
                      setProductoSeleccionado({ ...productoSeleccionado, unidades: e.target.value })
                    }
                  />
                  <button onClick={actualizarProducto}>Guardar Cambios</button>
                  <button onClick={() => setProductoSeleccionado(null)}>Cancelar</button>
                </div>
              )}
            </div> 
          
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

export default Admin;