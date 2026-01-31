
import Chip from '@mui/material/Chip';

export function StatusTable({status}){
    var componente;
    switch(status){
        case (1): componente = <Chip label="Activo" color="info" variant="outlined" />; break;
        case (2): componente = <Chip label="Inactivo" color="warning" variant="outlined" />; break;
        case (4): componente = <Chip label="Eliminado" color="error" variant="outlined" />; break;
    }

    return <>{componente}</>
}