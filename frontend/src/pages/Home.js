import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLoginDef from "./img/imgLoginDef.jpg"
import imgAdmin from "./img/imgAdmin.jpg"
import imgOper from "./img/imgOper.png"

import axios from 'axios';

function Home() {
  const [imgLogin, setImgLogin] = useState(imgLoginDef);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const [usuarioLista, setUsuariosLista] = useState([]);
  const [login, setLogin] = useState(true);
  const [registro, setRegistro] = useState(false);
  const [cargar, setCargar] = useState(false);
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
    cargo: 'Operario'
  });

  const buscador = usuarioLista.filter(usuario => usuario.correo === email);
  

  /* get */

  useEffect(() => {
    axios.get("http://localhost:5000/api/usuarios")
        .then(res => setUsuariosLista(res.data))
        .catch(err => console.error(err));
  }, []);

  /* post */

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
      e.preventDefault();
      axios.post("http://localhost:5000/usuarios", formData)
          .then(res => setUsuariosLista([...usuarioLista, res.data]))
          .then(alert("se guardo al usuarios"))
          .then(setRegistro(false))
          .catch(err => console.error(err));
  };

  /* login */

  const handleLogin = (e) => {
    e.preventDefault();
    
    
    if (buscador[0].cargo === "Administrador") {
      if (email === buscador[0].correo && password === buscador[0].contrasena) {
        setImgLogin(imgAdmin);
        setCargar(true);
        setInterval(()=> {
          navigate('/admin');
          
        },5000);
      } else {
        setError('Credenciales incorrectas');
      }
    }else{
      if (email === buscador[0].correo && password === buscador[0].contrasena) {
        setImgLogin(imgOper);
        setCargar(true);
        setInterval(()=> {
          navigate('/inventario'); 
          
        },5000);
      } else {
        setError('Credenciales incorrectas');
      }
    }
  };

  return (
    <section className='LoginSection'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {login && (
        <form className='formLogin' onSubmit={handleLogin}>
            <h2>Login</h2>
            <img src={imgLogin} />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Correo Electrónico'
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
              required
            />
          <button type="submit">Login</button>

          <button onClick={() => {
            setRegistro(true);
            setLogin(false)
          }}>
            Registrate
          </button>

          {cargar && (
            <div className="loader"></div>
          )}
        </form>
      )};
        

      {registro && (
        
        <form className='formRegistro' onSubmit={handleSubmit}>
          <h2>Registrate</h2>
          <input name="correo" placeholder="Correo Electrónico" onChange={handleChange} required />
          <input name="contrasena" placeholder="Contraseña" onChange={handleChange} required />
          
          <button onClick={()=> setLogin(true)} type="submit">Agregar</button>
          <button onClick={()=> {
            setRegistro(false);
            setLogin(true);
          }}>
            Cancelar
          </button>
        </form>
      )}
      
    </section>
  );
}

  export default Home;