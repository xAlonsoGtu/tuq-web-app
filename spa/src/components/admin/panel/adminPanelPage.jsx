import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function AdminPanelPage(){
    return(
          <Stack spacing={1}>
            <Skeleton variant="rounded" height={150} />
            <Skeleton variant="rounded" height={150} />
            <Skeleton variant="rounded" height={150} />
            <Skeleton variant="rounded" height={150} />
            <Skeleton variant="rounded" height={150} />
          </Stack>
    )
}

export default AdminPanelPage;