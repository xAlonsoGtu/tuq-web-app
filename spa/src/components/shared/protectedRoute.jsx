import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ConstantsRoutes } from '../../utils/constants/constantsRoutes.js';

function ProtectedRoute({ children }){
    //Validar usuario en localStorage
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to={ConstantsRoutes.SPA_LOGIN} replace />;
    }


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