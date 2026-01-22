import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Toaster } from 'react-hot-toast';
import '../appStyle.css';

//Componente padre, recive componentes hijos y los muestra
function SimpleLayout({ children }){
    //Si tiene hijos provenientes de estructuras react, los mostramos
    if(children){
        return (
            <div className='bg-main'>
                {/* Componente para mostrar mensajes de alerta */}
                <Toaster />
                {/* Escribimos los componentes hijos dentro del padre */}
                {children}
            </div>        
        )
    }
    //Si tiene hijos provenientes de estructuras router-dom, los mostramos
    else{
        return (
            <div className='bg-main'>
                {/* Componente para mostrar mensajes de alerta */}
                <Toaster />
                {/* Componente donde se cargarán los componentes hijos */}
                <Outlet />
            </div>        
        )
    }
}

export default SimpleLayout;