import * as React from 'react';
import { createContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { UsuarioAuth } from '../models/auth/loginForm';
import { getUsuarioAuth, removeSession } from '../utils/services/session.service';
import '../appStyle.css';
import UsuarioAppBar from './usuarioAppBar';

//Creamos contexto de usuario que tendrá los datos de autenticación y autorización del usuario logeado
//Autentificacion -> existe en la BD, es su usuario y su contraseña
//Autorizacion -> tiene los permisos para trabajar en ciertas partes de la aplicación (roles, tipo de usuario)
//Objeto que podrá ser usado por los componentes hijos si tener que estar pasandose como props
//Se podría decir que es una función global
export const UsuarioAuthContext = createContext();

//Creamos función component
export default function UsuarioLayout() {

  //Creamos variables de estado
  const [usuarioAuth, setUsuarioAuth] = React.useState(new UsuarioAuth()); //usuario de sessión usado en la aplicación
  const navigate = useNavigate(); //creamos objeto de router-dom para redirigirnos a otras partes de la aplicación

  //useEfect -> Hook de react para ejecutar procesos al momento de cargar/actualizar el componente
  //Al cargarse el componente validamos que el usuario tenga session
  useEffect(() => {
    //Obtenemos usuario de sesion Auth
    var aUser = getUsuarioAuth();

    //Si no hay usuario
    if(aUser == null) {
      //Removemos token de localStorage y redirigimos al login
      navigate(removeSession(), { replace: true });
    }

    //Si hay usuario, lo asignamos a nuestro objeto usuarioAuth
    setUsuarioAuth(aUser);
    //console.log(usuarioAuth);

    //Función de retorno cuando se cierra el componente
    //Ponemos en null el usuarioAuth
    return () => setUsuarioAuth(null)

    //Indicamos cuando se debe ejecutar esta funcion, 
    //Podemos indicarle que se ejecute cuando un objeto cambie su estado
    //[] -> sólo 1 vez
  }, []);

  return (
    //Definimos el contexto como un componente padre
    //value -> el objeto que pasará a los hijos
    <UsuarioAuthContext.Provider value={usuarioAuth}>
      {/* Componente Box de material - div
      sx -> propiedades
      className -> class de css */}
      <Box sx={{ display: 'flex' }} className='bg-main'>

        {/* Componente App Bar del admin */}
        <UsuarioAppBar/>

        {/* Box - div principal donde irán todos los componentes hijos
        Especificamos que ocupe todo el espacio y que tenga un padding de 2 */}
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>

          {/* Espacio para el toolbar */}
          <Toolbar />

          {/* Componente para mostrar mensajes de alerta */}
          <Toaster 
            //Opciones de color para el toast
            toastOptions={{
              success: {
                style: {
                  background: '#ecfaea',
                },
              },
              error: {
                style: {
                  background: '#ffeaea',
                },
              },
          }}/>

          {/* Componente donde se cargarán los componentes hijos */}
          <Outlet />
        </Box>
      </Box>
    </UsuarioAuthContext.Provider>

  );
}
