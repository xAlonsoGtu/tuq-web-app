import { Navigate } from 'react-router-dom';
import { ConstantsRoutes } from '../../utils/constants/constantsRoutes';

const NoMatch = () => {
	return (
		//Redirigir al login
        <Navigate to={ConstantsRoutes.SPA_LOGIN} replace />

		//Otra opcion es mostrar la página 404
		// <div>
		// 	<div className="container">
		// 		<div className="error-page">
		// 			<h1 className="error-code">404</h1>
		// 			<p className="error-text">Page not found</p>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default NoMatch;