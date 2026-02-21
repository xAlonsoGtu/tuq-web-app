import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

function AdminPanelPage(){
    return(
        <Stack spacing={3} sx={{padding: 3}}>          
            <Grid container spacing={3} sx={{ justifyContent: "center", alignItems: "stretch"}}>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                    <Paper sx={{padding: 3, borderRadius: 5, minHeight: 200}} variant="outlined" className='box-shadow-app'>
                        <Stack spacing={1}>
                          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            2026
                          </Typography>
                          <Typography variant="h5" component="div" color="success">
                            <SchoolIcon fontSize="small" color="success"/> Escolarizado
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Alumnos</Typography>
                          <Typography variant="body2" sx={{textAlign:"center", fontSize: 32}} color="success">
                            500
                          </Typography>
                          <div>
                            <Button variant="text" sx={{maxWidth:200, float: 'right'}}>Más información</Button>
                          </div>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                    <Paper sx={{padding: 3, borderRadius: 5, minHeight: 200}} variant="outlined" className='box-shadow-app'>
                        <Stack spacing={1}>
                          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            2026
                          </Typography>
                          <Typography variant="h5" component="div" color="primary">
                            <SchoolIcon fontSize="small" color="primary"/> Ejecutivo
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Alumnos</Typography>
                          <Typography variant="body2" sx={{textAlign:"center", fontSize: 32}} color="primary">
                            125
                          </Typography>
                          <div>
                            <Button variant="text" sx={{maxWidth:200, float: 'right'}}>Más información</Button>
                          </div>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                    <Paper sx={{padding: 3, borderRadius: 5, minHeight: 200}} variant="outlined" className='box-shadow-app'>
                        <Stack spacing={1}>
                          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            2026
                          </Typography>
                          <Typography variant="h5" component="div" color="orange">
                            <BusinessCenterOutlinedIcon fontSize="small" color="orange"/> Maestros
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Querétaro</Typography>
                          <Typography variant="body2" sx={{textAlign:"center", fontSize: 32}} color="orange">
                            36
                          </Typography>
                          <div>
                            <Button variant="text" sx={{maxWidth:200, float: 'right'}}>Más información</Button>
                          </div>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                    <Paper sx={{padding: 3, borderRadius: 5, minHeight: 200}} variant="outlined" className='box-shadow-app'>
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
            </Grid>
              <Grid container spacing={3} sx={{ justifyContent: "center", alignItems: "stretch"}}>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Paper sx={{padding: 3, borderRadius: 5}} variant="outlined" className='box-shadow-app'>
                        <Stack spacing={2}>
                            <h3>Bitácora</h3>
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                    <Paper sx={{padding: 3, borderRadius: 5}} variant="outlined" className='box-shadow-app'>
                        <Stack spacing={2}>
                            <h3>Ofertas de trabajo</h3>
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>       
        </Stack>  

    )
}

export default AdminPanelPage;