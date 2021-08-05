import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import './Form.css';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', recipe: '', shortDesc: '', category: '', pplNumber: '', prepTime: '', selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div id="PLEASE">
        <Typography variant="h5" align="center">
          Please sign in to create a recipe.
        </Typography>
      </div>
    );
  }

  return (
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        
        <TextField name="title" variant="outlined" label="Recipe Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="recipe" variant="outlined" label="Recipe" fullWidth multiline rows={4} value={postData.recipe} onChange={(e) => setPostData({ ...postData, recipe: e.target.value })} />
        <TextField name="shortDesc" variant="outlined" label="Short Description" fullWidth multiline rows={4} value={postData.shortDesc} onChange={(e) => setPostData({ ...postData, shortDesc: e.target.value })} />
        <TextField name="pplNumber" variant="outlined" label="Number of People" fullWidth value={postData.pplNumber} onChange={(e) => setPostData({ ...postData, pplNumber: e.target.value })} />
        <TextField name="prepTime" variant="outlined" label="Prep Time" fullWidth value={postData.prepTime} onChange={(e) => setPostData({ ...postData, prepTime: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <Select name="category" label="Category" fullWidth value={postData.category} onChange={(e) => setPostData({... postData, category: e.target.value})}>
            <MenuItem value="Breakfast">
              Breakfast
            </MenuItem>
            <MenuItem value="Brunch">
              Brunch
            </MenuItem>
            <MenuItem value="Lunch">
              Lunch
            </MenuItem>
            <MenuItem value="Dinner">
              Dinner
            </MenuItem>
          </Select>
        </div>
        <div className={classes.fileInput}><span id="IMGTEXT">Recipe Image</span> <br/> <br/><FileBase label="Upload Image" type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Save</Button>
      </form>
  );
};

export default Form;
