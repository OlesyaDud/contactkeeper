import React, {useState, useContext, useEffect} from 'react'
import { FormControl, Input, InputLabel, FormHelperText, FormGroup, Grid } from '@material-ui/core';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


 const Login =(props)=> {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
// destructoring so I can use it as variables
    const {  email, password } = user;

    useEffect(() => {
        // if authenticated, then redirecting
        if(isAuthenticated) {
            props.history.push('/');
        }
        if(error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history]);


    const onChange = e => setUser ({
        ...user,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email, password
            })
        }
    }

    return (
        <Grid>
            <Grid item>
                <h3>Account Login</h3>
            </Grid>

            <Grid item>
                <form onSubmit={onSubmit}>

                    <FormGroup >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input aria-describedby="text"
                        type="email" 
                        name="email"
                        value={email}
                        onChange={onChange}
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
                        />
                    </FormGroup>
     

                    <Input type="submit" value="Login" />
                </form>
            </Grid>
            
        </Grid>
    )
}
export default Login;