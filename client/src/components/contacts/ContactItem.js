import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ContactContext from '../../context/contact/contactContext';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import PhoneIcon from '@material-ui/icons/Phone';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
      minWidth: "100%",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    typography: {
      color: "white",
      backgroundColor: "lightgrey",
      width: "100%",
      textAlign: "center",
      padding: "3px",
      fontSize: "1.3rem"
    }
  });


 const ContactItem = ({contact}) => {
    //  initialize contact context
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent } = contactContext;
 

    const classes = useStyles();

    const {_id, name, email, phone, type} = contact;

    const onDelete =()=> {
        deleteContact(_id);
        clearCurrent();
    }

    return (
      <Card variant="outlined" style={{padding: "1em", marginBottom: ".5rem", marginTop: ".5em"}}>
          <CardContent>
         

        <List>
             <Typography className={classes.typography}>
                  {name} {' '} |
                  <span> {type}</span>
              </Typography>
        {email && (

                 <ListItem>
                <ListItemIcon>
                    <InboxIcon style={{fill:"blue"}} />
                </ListItemIcon>
                <ListItemText >
                    {email}
                </ListItemText>
            </ListItem>
        )}
       
            {phone && (
                     <ListItem>
                <ListItemIcon>
                    <PhoneIcon style={{fill:"blue"}}/>
                </ListItemIcon>
                <ListItemText >
                    {phone}
                </ListItemText>
            </ListItem> 
            )}
        </List>

        <CardActions style={{justifyContent: "center", textAlign: "center"}}>
        <Button  variant="contained" 
        size="small"
        onClick={() => setCurrent(contact)}
        >Edit</Button>
        <Button variant="contained" onClick={onDelete} color="secondary" size="small">Delete</Button>
      </CardActions>

          </CardContent>
      </Card>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem;