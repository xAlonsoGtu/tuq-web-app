import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import './index.css';

// Tema para material, modificar colores
const theme = createTheme({
  palette: {
    orange: {
      main: '#EC7425',
      light: '#de8f5aff',
      dark: '#d6661bff',
      contrastText: '#ffffffff',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Carga del tema */}
    <ThemeProvider theme={theme}>
      {/* Inicio de routes */}
      <BrowserRouter>
        {/* Si queremos mostar un loading, mientras se cargan las páginas usamos Suspense */}
        {/* <Suspense fallback={<LoadingGlobal/>}>
          <App/>
         </Suspense>     */}
         <App/>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
