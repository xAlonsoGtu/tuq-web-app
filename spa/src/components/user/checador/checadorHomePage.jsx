import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

function ChecadorHomePage(){
    return(
        <Stack spacing={2}>
            <Grid container spacing={3}>
                <Grid size="grow" sx={{ display: { sm: 'none', md: 'block' } }}>
                    <Box></Box>
                </Grid>
                <Grid size={{ sm: 12, md: 5 }}>
                    <Paper sx={{padding: 3, borderRadius: 5}} variant="outlined" className='box-shadow-app'>
                        <Stack spacing={2}>
                            <p className='alumno_home_mensaje'>¡Bienvenido!</p>
                            <div className='alumno_home_qr'>
                                <img src={process.env.PUBLIC_URL+'/media/qr_fondo.png'} alt="qr" />
                            </div>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size={{ sm: 12, md: 5 }}>
                    <Paper sx={{padding: 3, borderRadius: 5}} variant="outlined" className='box-shadow-app'>
                        <Stack spacing={2}>
                            <h3>Bitacora</h3>
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size="grow" sx={{ display: { sm: 'none',  md: 'block'  } }}>
                    <Box></Box>
                </Grid>
            </Grid>            
        </Stack>


    )
}

export default ChecadorHomePage;