
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function SkeletonTable(){
    return(
          //Agregamos un stack que sirve para colocar los elementos de forma horizontal o vertical distribuyendo su tamaño */}
          <Stack spacing={1}>
            {/* Skeleton sirve para indicar que aun no se cargan los elementos, es como un div que se muestra antes de que se carguen los verdaderos datos */}
            <Skeleton variant="rounded"  height={50} />
            <Skeleton variant="rounded" height={150} />
            <Skeleton variant="rounded" height={150} />
          </Stack>
    );
}