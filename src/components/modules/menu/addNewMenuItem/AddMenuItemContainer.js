/* eslint-disable react/no-unused-state */
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

// const formData = new FormData();
const INITIAL_STATE = {
  name: '',
  price: '',
  description: '',
  imageUrl: '',
  imageFile: '',
  imagePreviewfromFile: '',
  category: '',
  ingredient: '',
  selectedIngredients: [],
  isLoading: false,
  availableingredients: [],
};

class AddDishContainer extends Component {
  // constructor(props) {
  //   super(props)

  //   // Create the ref
  //   this.textInput = React.createRef();
  //   this.state = {
  //     value: ''
  //   }
  // }

  state = {
    ...INITIAL_STATE,
  };

  imgFileRef = React.createRef();

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
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case 'imageUrl': {
        console.log(e.target);
        if (this.imgFileRef.current.files[0]) {
          console.log(this.imgFileRef.current.files.length);
          this.imgFileRef.current.value = '';
        }

        this.setState({
          imageFile: '',
          imagePreviewfromFile: '',
          [name]: value,
        });
        break;
      }
      case 'imageFile': {
        const reader = new FileReader();
        const imageFile = e.currentTarget.files[0];

        // handle "file is not selected"
        if (!imageFile) {
          this.setState({
            imageFile: '',
            imagePreviewfromFile: '',
          });
          return;
        }
        // handle file is selected

        reader.onloadend = () => {
          this.setState({
            imageUrl: '',
            imageFile,
            imagePreviewfromFile: reader.result,
          });
        };

        reader.readAsDataURL(imageFile);

        break;
      }

      default:
        this.setState({
          [name]: value,
        });
    }
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
    this.imgFileRef.current.value = '';
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      price,
      imageFile,
      imageUrl,
      description,
      selectedIngredients,
      category,
    } = this.state;

    const { onAddNewMenuItem, onGoBack } = this.props;
    if (!category) {
      return alert('specify category');
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('imageUrl', imageUrl);
    formData.append('imageFile', imageFile);
    formData.append('selectedIngredients', selectedIngredients);
    formData.append('category', category);

    this.toggleLoading();
    return apiPostMenuItem(formData)
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
          imgFileRef={this.imgFileRef}
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
