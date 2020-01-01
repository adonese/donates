import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function Bar() {
    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                {/* <Typography variant="h6" >
                    News
                </Typography> */}
                <Button href="/" color="inherit">Home</Button>
                <Button href="/faq" color="inherit">FAQ</Button>
            </Toolbar>
        </AppBar>
    )
};