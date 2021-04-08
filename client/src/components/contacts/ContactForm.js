import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import Radio from '@material-ui/core/Radio';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    form: {
      marginTop: "10rem"
    }
  });


 const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, updateContact, clearCurrent, current } = contactContext;
    const classes = useStyles();
   


    useEffect(() => {
        if(current !== null) {
            setContact(current);
        }else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal', 
            });
        }
    }, [contactContext, current]); 

     const [contact, setContact] = useState({
         name: '',
         email: '',
         phone: '',
         type: 'personal',
     });
 
     const { name, email, phone, type } = contact;
     const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value});

     const onSubmit = e => {
        e.preventDefault();

        if(current === null) {
            addContact(contact);
        }else {
            updateContact(contact);
        }
        clearAll();
     };

     const clearAll =()=> {
        clearCurrent();
     }

    return (
        <form  onSubmit={onSubmit} className={classes.form} style={{textAlign: "center"}} autoComplete="off">
        <h2>{current ? 'Edit Contact' : 'Add Contact'}</h2>

        <div >
          <Input
            placeholder="Name"
            name="name"
            fullWidth={true}
            type="text"
            value={name}
            onChange={onChange}
          />

            <Input
            placeholder="Email"
            name="email"
            fullWidth={true}
            type="email"
            value={email}
            onChange={onChange}
          />

            <Input
            placeholder="Phone"
            name="phone"
            fullWidth={true}
            type="text"
            value={phone}
            onChange={onChange}
          />

          <h5>Contact Type</h5>
          </div>
          <Radio
            checked={type === 'personal'}
            onChange={onChange}
            value="personal"
            name="type"
            inputProps={{ 'aria-label': 'Personal' }}
            /> Personal {' '}

            <Radio
            checked={type === 'professional'}
            onChange={onChange}
            value="professional"
            name="type"
            inputProps={{ 'aria-label': 'Professional' }}
            /> Professional
     

        {/* <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          variant="contained" 
        />
        </div> */}

        <div>
        <Button
          type='submit'
          variant="contained"
          onSubmit={onSubmit} 
          color="primary">
          {current ? 'Update Contact' : 'Add Contact'}
       </Button>
        </div>

        {current && <div>
            <Button variant="contained" 
            size="small"
            onClick={clearAll}
            style={{marginTop: "10px"}}>Clear</Button>
        </div>}
        </form>
    )
}
export default ContactForm;