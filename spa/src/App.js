import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/shared/protectedRoute';
import AdminDashboardPage from './components/admin/panel/adminDashboardPage';
import NoMatch from './components/shared/noMatch';
import SimpleLayout from './layouts/simpleLayout';

//Usamos lazy para cargar paginas cuando se necesiten
const LoginPage = lazy(() => import('./components/auth/login/loginPage'));

function App() {
  return (
    // Definimos rutas
      <Routes>
        {/* Ruta padre auth */}
        <Route path="/auth" element={<SimpleLayout />}>
          <Route path="login" element={<LoginPage/>}/>
        </Route>

        {/* Rutas protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SimpleLayout />}>
            <Route path="/dashboard" element={<AdminDashboardPage />} />
          </Route>
        </Route>

        {/* <Route path="/auth" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />}>
        <Route path="car" element={<Car/>}/>
        </Route>
        <Route path="/products/:slug" element={<ProductDetails />} /> */}       

        {/* Ruta por defecto */}
        <Route path="*" element={<NoMatch />} />
      </Routes> 
  );
}

export default App;
