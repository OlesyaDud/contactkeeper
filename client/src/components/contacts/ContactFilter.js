import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { Input } from '@material-ui/core';

 const ContactFilter = () => {
     const contactContext = useContext(ContactContext);
     const text = useRef('');
     const { filterContacts, clearFilter, filtered } = contactContext;

     useEffect(() => {
         if(filtered === null) {
            text.current.value = '';
         }else {

         }
     });

     const onChange = e => {
         if(text.current.value !== '') {
            filterContacts(e.target.value);
         }else {
            clearFilter();
         }
     }

    return (
        <form style={{marginTop: "5em", width: "100%"}}>
            <Input
            placeholder="Filter Contacts..."
            rowsMax={4}
            type="text"
            inputRef={text}
            onChange={onChange}
          /> 
        </form>
    )
}
export default ContactFilter;