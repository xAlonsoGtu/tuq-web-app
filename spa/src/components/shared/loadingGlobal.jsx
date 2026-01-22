import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

//Compoenten de login global, se muestra al cargar componentes react (módulos)
function LoadingGlobal(){
  return (
    <div className='loading-global-container'>
      <CircularProgress enableTrackSlot size="100px" color="orange" />
      {/* <p>Cargando...</p> */}
    </div>
  );
}

export default LoadingGlobal;