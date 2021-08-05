import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logoPlus from './assets/images/icon_plus_white.svg';
import logoDelete from './assets/images/icon_trashcan.svg';
import './style/recipeList.css';

import { getPosts, deletePost } from '../actions/posts';


export function RecipesList () {
  // const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const recipes = useSelector(state => state.posts); // recipe-reducer

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(deleteRecipe());
  }, [dispatch]);

  return (
    <div className="recipes-list">

      <span className="my-recipes">My Recipes</span>

      <Link to={"/recipe-profile"}>
        <img src={logoPlus} alt="icon_plus" className="icon_plus" />
      </Link>
      <span>ADD RECIPE</span>

      <div className="recipes-table" >
        <table border="1">
          <thead>
            <tr>
              <th>Recipe Name</th>
              <th>Category</th>
              <th>Created On</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {!recipes.length ? <span>No recipes here !!</span> :
              recipes.map(recipe => {
                return (
                  <tr key={recipe._id}>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>{post.createdAt}</td>
                    <td>
                      <img src={logoDelete} alt="icon_delete" className="icon_delete"
                        onClick={() => dispatch(deleteRecipe(recipe._id))}
                      />
                    </td>
                  </tr>
                )
              })
            }</tbody>

        </table>
      </div>

    </div>
  )
};