import React, {Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItem, MenuItem, Menu, List, IconButton,Button,Typography, Toolbar, AppBar } from '@material-ui/core';
import ContactsIcon from '@material-ui/icons/Contacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    helloMessage: {
        margintLeft: "20%"
    },
    fragment: {
        marginLeft: "20%"
    },
    menuItem: {
        color: "white",
        fontSize: "1.2em",
        textStyle: "none"
    },
    exit: {
        color: "white",
        fontSize: "2em"
    },
    toolbarDiv: {
        justifyContent: "center"
    }
  }));


const Navbar =({title })=> {
    const classes = useStyles();
    const theme= useTheme();
     const isMobileBreakpoint = useMediaQuery(theme.breakpoints.down('xs'));
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
   



    const onLogout =()=> {
        logout();
        clearContacts();
    }

    const handleMenu = e => {
        setAnchor(e.currentTarget);
    }

    const handleClose =() => {
        setAnchor(null);
    };


    const authLinks = (
        <Fragment className={classes.fragment}>
            <List>
                <a onClick={onLogout} href="#">
                <ExitToAppIcon style={{ 'paddingLeft': "90%" }} className={classes.exit} />
                </a>
            </List>
        </Fragment>
    );
    const guestLinks = (
        <Fragment className={classes.fragment}>
            <MenuItem onClick={handleClose}>
                <Link to ='/login' className={classes.menuItem}>Login</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link to ='/register' className={classes.menuItem}>Register</Link>
            </MenuItem>
        </Fragment>
    );

    return (
    <AppBar position="static" >
        <Toolbar>
        <div >
            {isMobileBreakpoint ? (
                <Fragment>
                 <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                <MenuIcon />
                </IconButton>

                <Menu 
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
                >
                <MenuItem>
                    { isAuthenticated ? authLinks : guestLinks }
                </MenuItem>
                </Menu>
                </Fragment>
            ) : (
                <Fragment>
                <Typography variant="h6" className={classes.title}>
                <ContactsIcon />{title}
                </Typography>

                <ListItem>
                    { isAuthenticated ? authLinks : guestLinks }
                </ListItem>
                </Fragment>
            )}
     
        </div>
        </Toolbar>
    </AppBar>    
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    // icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contacts App'
}

export default Navbar;