import React, {useContext, useEffect} from 'react';
import Contacts from '../contacts/Contacts';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


 const Home =()=> {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return (
<div styles={{marginTop: "5em"}}>
            <Grid container spacing={2}>
            <Grid item item lg={12}>
            <Typography className={classes.helloMessage} style={{marginTop: "5rem", textAlign: "center"}}>
             <Box fontWeight="fontWeightBold" m={1} fontSize={30} style={{color: "10, 37, 84"}}>
      Hello {user && user.name}
      </Box>
            </Typography>
            </Grid>

                <Grid  item lg={12}>
                    <ContactFilter />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <ContactForm /> 
                </Grid>

                <Grid  item xs={12} sm={6}>
                    <Contacts />
                </Grid>
            
            </Grid>
</div>
    )
}
export default Home;