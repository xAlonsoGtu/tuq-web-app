import * as React from 'react';
import { createContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import AdminSideBar from './adminSideBar';
import AdminAppBar from './adminAppBar';
import { UsuarioAuth } from '../models/auth/loginForm';
import { getUsuarioAuth, removeSession } from '../utils/services/session.service';
import '../appStyle.css';

//Tamaño del sidebar
const drawerWidth = 230;

//Creamos contexto de usuario que tendrá los datos de autenticación y autorización del usuario logeado
//Autentificacion -> existe en la BD, es su usuario y su contraseña
//Autorizacion -> tiene los permisos para trabajar en ciertas partes de la aplicación (roles, tipo de usuario)
//Objeto que podrá ser usado por los componentes hijos si tener que estar pasandose como props
//Se podría decir que es una función global
export const UsuarioAuthContext = createContext();

//Creamos función component
export default function AdminLayout() {

  //Creamos variables de estado
  const [mobileOpen, setMobileOpen] = React.useState(false); //determina si esta abierto el sidebar para los mobiles
  const [isClosing, setIsClosing] = React.useState(false); //determina si esta en proceso de cierre el sidebar
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

    //Función de retorno cuando se cierra el componente
    //Ponemos en null el usuarioAuth
    return () => setUsuarioAuth(null)

    //Indicamos cuando se debe ejecutar esta funcion, 
    //Podemos indicarle que se ejecute cuando un objeto cambie su estado
    //[] -> sólo 1 vez
  }, []);

  //Funcion que modifica estados cuando se cierra el sidebar
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  //Funcion que indica cuando se esta cerrando
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  //Funcion que cierra sideBar
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    //Definimos el contexto como un componente padre
    //value -> el objeto que pasará a los hijos
    <UsuarioAuthContext.Provider value={usuarioAuth}>

      {/* Componente Box de material - div
      sx -> propiedades
      className -> class de css */}
      <Box sx={{ display: 'flex' }} className='bg-main'>

        {/* Componente App Bar del admin */}
        <AdminAppBar handle={handleDrawerToggle}/>

        {/* SideBar permanente(fijo), se oculta cuando la pantalla sea tamaño xs */}
        <Drawer
          variant="permanent"
          sx={{
              width: drawerWidth,
              display: { xs: 'none', sm: 'block' },
              // Especifica el factor de contracción de un flex item, para que abarque todo el componente
              flexShrink: 1,
              // Edición de un estilo de material
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }, 
          }}
          open
        >
          {/* Espacio para el toolbar */}
          <Toolbar/>

          {/* Componente sideBar creado por nosotros */}
          <AdminSideBar/>
        </Drawer>

        {/* SideBar temporary(temporal - encima de la aplicación), se oculta cuando la pantalla sea tamaño sm o superior */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {/* Espacio para el toolbar */}
          <Toolbar/>

          {/* Componente sideBar creado por nosotros */}
          <AdminSideBar/>
        </Drawer>

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
