import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './Auth.css';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
    <Typography component="h1" variant="h5" id="TOP">{ isSignup ? (<><div id="HRLINE">Create Account</div></>) : (<><div id="HRLINETWO">Log In</div></>) }</Typography>
    <div id="AUTHENTICATE">
      <div id="TEXT">
        {isSignup ? (<><h1 id="WELCOME">Create your <span id="BABYS">Account</span></h1>
        <p>Mauris vitae blandit elit, eget malesuada urna. Morbi porta erat vel tincidunt fermentum. Donec eget neque vitae tellus sollicitudin tincidunt sed a justo. Quisque tincidunt erat at pretium blandit. Integer feugiat orci et erat ultricies, ac finibus mauris tempus. Nulla eu imperdiet arcu, vitae lacinia metus. Suspendisse placerat, odio id tempus pretium, sem nibh pretium tortor, dignissim vulputate elit diam eu lorem. Curabitur volutpat erat vitae suscipit tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur ipsum ante, sagittis eget sagittis sit amet, dapibus vel libero.</p></>) : (<> <h1 id="WELCOME">Welcome to <span id="BABYS">Baby's</span></h1>
        <p>Mauris vitae blandit elit, eget malesuada urna. Morbi porta erat vel tincidunt fermentum. Donec eget neque vitae tellus sollicitudin tincidunt sed a justo. Quisque tincidunt erat at pretium blandit. Integer feugiat orci et erat ultricies, ac finibus mauris tempus. Nulla eu imperdiet arcu, vitae lacinia metus. Suspendisse placerat, odio id tempus pretium, sem nibh pretium tortor, dignissim vulputate elit diam eu lorem. Curabitur volutpat erat vitae suscipit tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur ipsum ante, sagittis eget sagittis sit amet, dapibus vel libero.</p> </>)}
      </div>
    <Container id="ACTUALAUTH" component="main" maxWidth="xs">
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Create Account' : 'Log In' }
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Log In' : "Don't have an account? Create an Account" }
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
    </div>
    </>
  );
};

export default SignUp;
