import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import '../appStyle.css';

function SimpleLayout({ children }){
    if(children){
        return (
            <div className='bg-main'>
                <Container maxWidth="false" style={{padding: 0}}>
                    {children}
                </Container>
            </div>        
        )
    }else{
        return (
            <div className='bg-main'>
                <Outlet />
            </div>        
        )
    }
}

export default SimpleLayout;