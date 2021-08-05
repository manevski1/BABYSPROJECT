import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import './Home.css';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;

  const [currentId, setCurrentId] = useState(0);

  const history = useHistory();



  return (
    <>
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={4} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Pagination page={page} showPagination={false}/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
    </>
  );
};

export default Home;
