import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ConstantsRoutes } from '../../utils/constants/constantsRoutes.js';
import { validarUsuarioAuth } from '../../utils/services/session.service.ts';

function ProtectedRoute({ children, tipo }){
    var isAuthenticated = true;
    //Validar usuario en token - localStorage
    if(tipo != null && tipo != undefined){
        isAuthenticated = validarUsuarioAuth(Number.parseInt(tipo));
    }

    //Si no es valido redirigir
    if (!isAuthenticated) {
        return <Navigate to={ConstantsRoutes.SPA_LOGIN} replace />;
    }

    //Si es correcto seguir
    if(children){
        return (
            {children}
        )
    }else{
        return (
             <Outlet /> 
        )
    }
}
export default ProtectedRoute;