import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/shared/protectedRoute';
import NoMatch from './components/shared/noMatch';
import SimpleLayout from './layouts/simpleLayout';
import AdminLayout from './layouts/adminLayout';
import AdminPanelPage from './components/admin/panel/adminPanelPage';

//Usamos lazy para cargar paginas cuando se necesiten
const LoginPage = lazy(() => import('./components/auth/login/loginPage'));
const MaestroPage = lazy(() => import('./components/admin/maestro/maestroPage'));
const MaestroAgregarPage = lazy(() => import('./components/admin/maestro/maestroAgregarPage'));
const AlumnoPage = lazy(() => import('./components/admin/alumno/alumnoPage'));
const AlumnoAgregarPage = lazy(() => import('./components/admin/alumno/alumnoAgregarPage'));


function App() {
  return (
    // Definimos rutas
      <Routes>
        {/* Ruta padre auth */}
        <Route path="/auth" element={<SimpleLayout />}>
          <Route path="login" element={<LoginPage/>}/>
        </Route>

        {/* Rutas protected, valida si tiene acceso por el tipo de usuario */}
        <Route element={<ProtectedRoute tipo="1"/>}>
          {/* Usa layout de Admin para mostrar las páginas dentro de el */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Página principal por defecto */}
            <Route path="" element={<NoMatch />} />
            <Route path="panel" element={<AdminPanelPage />} />
            <Route path="maestro" element={<MaestroPage />} />
            <Route path="maestro/agregar" element={<MaestroAgregarPage />} />
            <Route path="alumno" element={<AlumnoPage />} />
            <Route path="alumno/agregar" element={<AlumnoAgregarPage />} />

          </Route>
        </Route>

        {/*<Route path="/products/:slug" element={<ProductDetails />} /> */}       

        {/* Ruta por defecto */}
        <Route path="*" element={<NoMatch />} />
      </Routes> 
  );
}

export default App;
