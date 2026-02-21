import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/shared/protectedRoute';
import NoMatch from './components/shared/noMatch';
import SimpleLayout from './layouts/simpleLayout';
import AdminLayout from './layouts/adminLayout';
import AdminPanelPage from './components/admin/panel/adminPanelPage';
import UsuarioLayout from './layouts/usuarioLayout';

//Usamos lazy para cargar paginas cuando se necesiten
const LoginPage = lazy(() => import('./components/auth/login/loginPage'));
const MaestroPage = lazy(() => import('./components/admin/maestro/maestroPage'));
const MaestroAgregarPage = lazy(() => import('./components/admin/maestro/maestroAgregarPage'));
const AlumnoPage = lazy(() => import('./components/admin/alumno/alumnoPage'));
const AlumnoAgregarPage = lazy(() => import('./components/admin/alumno/alumnoAgregarPage'));

const MaestroEditarPage = lazy(() => import('./components/admin/maestro/maestroEditarPage'));
const MaestroPerfilPage = lazy(() => import('./components/admin/maestro/maestroPerfilPage'));

//Usuarios
const AlumnoHomePage = lazy(() => import('./components/user/alumno/alumnoHomePage'));
const ChecadorHomePage = lazy(() => import('./components/user/checador/checadorHomePage'));
const EmpleadoHomePage = lazy(() => import('./components/user/empleado/empleadoHomePage'));
const MaestroHomePage = lazy(() => import('./components/user/maestro/maestroHomePage'));

const AvisoPage = lazy(() => import('./components/admin/aviso/AvisoPage'));
const AvisoAgregarPage = lazy(() => import('./components/admin/aviso/avisoAgregapage'));

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
            <Route path="avisos" element={<AvisoPage />} />
            <Route path="maestro/agregar" element={<MaestroAgregarPage />} />
            <Route path="alumno" element={<AlumnoPage />} />
            <Route path="alumno/agregar" element={<AlumnoAgregarPage />} />

            <Route path="avisos/agregar" element={<AvisoAgregarPage />} />
            <Route path="maestro/editar/:id" element={<MaestroEditarPage />} />
            <Route path="maestro/perfil" element={<MaestroPerfilPage />} />
          </Route>
        </Route>


        {/* Rutas protected, valida si tiene acceso por el tipo alumno */}
        <Route element={<ProtectedRoute tipo="0"/>}>
          {/* Usa layout de Admin para mostrar las páginas dentro de el */}
          <Route path="/alumno" element={<UsuarioLayout />}>
            {/* Página principal por defecto */}
            <Route path="" element={<NoMatch />} />
            <Route path="home" element={<AlumnoHomePage />} />
          </Route>
        </Route>



        {/* Rutas protected, valida si tiene acceso por el tipo empleado */}
        <Route element={<ProtectedRoute tipo="2"/>}>
          {/* Usa layout de Admin para mostrar las páginas dentro de el */}
          <Route path="/empleado" element={<UsuarioLayout />}>
            {/* Página principal por defecto */}
            <Route path="" element={<NoMatch />} />
            <Route path="home" element={<EmpleadoHomePage />} />
          </Route>
        </Route>



        {/* Rutas protected, valida si tiene acceso por el tipo maestro */}
        <Route element={<ProtectedRoute tipo="3"/>}>
          {/* Usa layout de Admin para mostrar las páginas dentro de el */}
          <Route path="/maestro" element={<UsuarioLayout />}>
            {/* Página principal por defecto */}
            <Route path="" element={<NoMatch />} />
            <Route path="home" element={<MaestroHomePage />} />
          </Route>
        </Route>



        {/* Rutas protected, valida si tiene acceso por el tipo checador */}
        <Route element={<ProtectedRoute tipo="4"/>}>
          {/* Usa layout de Admin para mostrar las páginas dentro de el */}
          <Route path="/checador" element={<UsuarioLayout />}>
            {/* Página principal por defecto */}
            <Route path="" element={<NoMatch />} />
            <Route path="home" element={<ChecadorHomePage />} />
          </Route>
        </Route>   

        {/* Ruta por defecto */}
        <Route path="*" element={<NoMatch />} />
      </Routes> 
  );
}

export default App;
