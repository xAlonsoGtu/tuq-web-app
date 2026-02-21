import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

function MaestroHomePage(){
    return(
        <Stack spacing={2}>
            <Grid container spacing={3}>
                <Grid size="grow" sx={{ display: { sm: 'none', md: 'block' } }}>
                    <Box></Box>
                </Grid>
                <Grid size={{ sm: 12, md: 10 }}>
                    <Paper sx={{padding: 3, borderRadius: 5}} variant="outlined" className='box-shadow-app'>
                        <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: "center", alignItems: "stretch" }}>
                            <Card variant="outlined" sx={{ borderRadius: '25px', textAlign: 'center' }}>
                                <CardContent className="alumno_home_img_box">
                                    <img src={process.env.PUBLIC_URL+'/media/sne_logo.png'} alt="back" />
                                    <a href="https://www.empleo.gob.mx/">https://www.empleo.gob.mx</a>
                                </CardContent>
                            </Card>
                            <Card variant="outlined" sx={{ borderRadius: '25px', textAlign: 'center' }}>
                                <CardContent className="alumno_home_img_box">
                                    <img src={process.env.PUBLIC_URL+'/media/linked_logo.png'} alt="back" />
                                    <a href="https://www.linkedin.com/">https://www.linkedin.com</a>
                                </CardContent>
                            </Card>
                            <Card variant="outlined" sx={{ borderRadius: '25px', textAlign: 'center' }}>
                                <CardContent className="alumno_home_img_box">
                                    <img src={process.env.PUBLIC_URL+'/media/occ_logo.png'} alt="back" />
                                    <a href="www.occ.com.mx/">www.occ.com.mx</a>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size="grow" sx={{ display: { sm: 'none',  md: 'block'  } }}>
                    <Box></Box>
                </Grid>
            </Grid>


            <Grid container spacing={3}>
                <Grid size="grow" sx={{ display: { sm: 'none', md: 'block' } }}>
                    <Box></Box>
                </Grid>
                <Grid size={{ sm: 12, md: 5 }}>
                    <Paper sx={{padding: 3, borderRadius: 5}} variant="outlined" className='box-shadow-app'>
                        <Stack spacing={2}>
                            <p className='alumno_home_mensaje'>¡Bienvenido maestro!</p>
                            <div className='alumno_home_qr'>
                                <img src={process.env.PUBLIC_URL+'/media/qr_fondo.png'} alt="qr" />
                            </div>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size={{ sm: 12, md: 5 }}>
                    <Paper sx={{padding: 3, borderRadius: 5}} variant="outlined" className='box-shadow-app'>
                        <Stack spacing={2}>
                            <h3>Avisos</h3>
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

export default MaestroHomePage;