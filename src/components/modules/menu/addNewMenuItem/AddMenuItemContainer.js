/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddDishForm from './AddMenuItemView';
import styles from './AddMenuItem.module.css';
import apiPostMenuItem from './$services/apiPostMenuItem';
import addMenuItemActions from './duck/addMenuItemActions';

const INITIAL_STATE = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: '',
  ingredient: '',
  ingredients: [],
};

let ingredientsContainer = [];
const filterIngredients = (ingredients, filter) =>
  ingredients.filter(ingredient => ingredient !== filter);

class AddDishContainer extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount = () => {
    ingredientsContainer = [];
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleCategorySelect = id => {
    this.setState({
      category: id,
    });
  };

  handleAddIngredient = () => {
    const { ingredient } = this.state;
    if (!ingredient || ingredientsContainer.includes(ingredient)) return;
    ingredientsContainer.push(ingredient);

    this.setState({
      ingredients: ingredientsContainer,
      ingredient: '',
    });
  };

  handleDeleteIngredient = selectedIngrToRemove => {
    const { ingredients } = this.state;
    ingredientsContainer = filterIngredients(ingredients, selectedIngrToRemove);

    this.setState({
      ingredients: ingredientsContainer,
    });
  };

  handleReset = () => {
    this.setState({ ...INITIAL_STATE });
    ingredientsContainer = [];
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      price,
      image,
      description,
      ingredients,
      category,
    } = this.state;
    const { onAddNewMenuItem, onGoBack } = this.props;
    if (!category) {
      return alert('specify category');
    }
    return apiPostMenuItem({
      name,
      price,
      image,
      description,
      ingredients,
      category,
    }).then(response => {
      onAddNewMenuItem(response.data.menuItem);
      if (response.status === 201) {
        alert('Dish was Successfully added!');
        onGoBack();
      }
    });
  };

  render() {
    const { onGoBack, categoriesOption } = this.props;
    const options = [];
    categoriesOption.map(option =>
      options.push({
        value: option.name,
        label: option.name,
        categoryId: option._id,
      }),
    );

    return (
      <>
        <AddDishForm
          props={this.state}
          onChange={this.handleChange}
          onReset={this.handleReset}
          onSubmit={this.handleSubmit}
          addIngredient={this.handleAddIngredient}
          onDeleteIngredient={this.handleDeleteIngredient}
          categoryOptions={options}
          onCategorySelect={this.handleCategorySelect}
        />
        <button className={styles.goBackBtn} onClick={onGoBack} type="button">
          <img
            src="https://cdn3.iconfinder.com/data/icons/glyph/227/Button-Back-1-512.png"
            alt="goBack"
          />
        </button>
      </>
    );
  }
}

// const mapStateToProps = state => ({

// });
const mapDispatchToProps = {
  onAddNewMenuItem: addMenuItemActions.fetchSuccess,
};

export default connect(
  null,
  mapDispatchToProps,
)(AddDishContainer);
