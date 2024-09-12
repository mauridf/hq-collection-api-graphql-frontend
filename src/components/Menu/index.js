import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#333',
        },
        secondary: {
            main: '#f39c12',
        },
    },
});

const Menu = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Logo</Link>
                    </Typography>
                    <Button color="inherit"><Link to="/editoras" style={{ color: 'white', textDecoration: 'none' }}>Editoras</Link></Button>
                    <Button color="inherit"><Link to="/personagens" style={{ color: 'white', textDecoration: 'none' }}>Personagens</Link></Button>
                    <Button color="inherit"><Link to="/hqs" style={{ color: 'white', textDecoration: 'none' }}>HQs</Link></Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

export default Menu;
