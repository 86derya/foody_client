/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddDishForm from './AddMenuItemView';
import styles from './AddMenuItem.module.css';
import apiPostMenuItem from './$services/apiPostMenuItem';
import addMenuItemActions from './duck/addMenuItemActions';
import apiGetAllIngredients from './$services/apiGetAllIngredients';
import Spinner from '../../../spinner';

const INITIAL_STATE = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: '',
  ingredient: '',
  selectedIngredients: [],
  isLoading: false,
  availableingredients: [],
};

class AddDishContainer extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount = () => {
    this.toggleLoading();
    apiGetAllIngredients().then(response => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        availableingredients: [
          ...response.data.ingredients.map(i => {
            const p = { value: i.name, label: i.name };
            return p;
          }),
        ],
      });
      this.toggleLoading();
    });
  };

  handleIngredientsChange = (newValue = '') => {
    this.setState({
      selectedIngredients: newValue.map(i => i.value),
    });
  };

  toggleLoading = () => {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading });
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

  handleReset = () => {
    const { availableingredients } = this.state;
    this.setState({
      ...INITIAL_STATE,
      availableingredients,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      price,
      image,
      description,
      selectedIngredients,
      category,
    } = this.state;
    const { onAddNewMenuItem, onGoBack } = this.props;
    if (!category) {
      return alert('specify category');
    }
    this.toggleLoading();
    return apiPostMenuItem({
      name,
      price,
      image,
      description,
      ingredients: [...selectedIngredients],
      category,
    })
      .then(response => {
        if (response.status === 201) {
          onAddNewMenuItem(response.data.menuItem);
          this.toggleLoading();
          alert('Dish was Successfully added!');
          onGoBack();
        } else {
          this.toggleLoading();
          alert(response.data.message);
        }
      })
      .catch(err => {
        this.toggleLoading();
        alert(err);
      });
  };

  render() {
    const { onGoBack, categoriesOption } = this.props;
    const { isLoading } = this.state;
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
        {isLoading && <Spinner />}
        <AddDishForm
          props={this.state}
          onChange={this.handleChange}
          onReset={this.handleReset}
          onSubmit={this.handleSubmit}
          addIngredient={this.handleAddIngredient}
          onDeleteIngredient={this.handleDeleteIngredient}
          categoryOptions={options}
          onCategorySelect={this.handleCategorySelect}
          handleIngredientsChange={this.handleIngredientsChange}
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

const mapDispatchToProps = {
  onAddNewMenuItem: addMenuItemActions.fetchSuccess,
};

export default connect(
  null,
  mapDispatchToProps,
)(AddDishContainer);