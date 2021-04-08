import React, { useState, useContext, useEffect } from 'react'
import { Input, Button,TextField, InputLabel, FormHelperText, FormGroup, Grid } from '@material-ui/core';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

 const Register =(props)=> {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        // if authenticated, then redirecting
        if(isAuthenticated) {
            props.history.push('/');
        }
        if(error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name:'',
        email: '',
        password: '',
        password2: '' 
    })
// destructoring so I can use it as variables
    const { name, email, password, password2 } = user;

    const onChange = e => setUser ({
        ...user,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
          register({
              name, email, password
          })
        }
       
    }

    return (
        <Grid>
            <Grid item>
                <h3>Account Register</h3>
            </Grid>

            <Grid item>
                <form onSubmit={onSubmit}>

                    <FormGroup >
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input aria-describedby="text"
                        type="text" 
                        name="name"
                        value={name}
                        onChange={onChange}
                        required={true}
                        inputProps={{ minLength: 6 }}
                        />
                    </FormGroup>

                    <FormGroup >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input aria-describedby="text"
                        type="email" 
                        name="email"
                        value={email}
                        onChange={onChange}
                        required={true}
                        />
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormGroup>

                    <FormGroup >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input aria-describedby="password"
                        type="password" 
                        name="password"
                        value={password}
                        onChange={onChange}
   
                        inputProps={{ minLength: 6 }}
                        />
                    </FormGroup>
                    <FormGroup >
                        <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                        <Input aria-describedby="password2"
                        type="password2" 
                        name="password2"
                        value={password2}
                        onChange={onChange}

                        inputProps={{ minLength: 6 }}
                        />
                    </FormGroup>

                    <Button variant="outlined" color="secondary" type="submit" value="Register">Resister</Button>
                </form>
            </Grid>
            
        </Grid>
    )
}
export default Register;