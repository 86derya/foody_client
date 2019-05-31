import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Modal from '../../modal';
import AddMenuItem from './addNewMenuItem';

import Menu from './MenuView';
import { menuOperations, menuSelectors, menuActions } from './duck';
import addMenuItemActions from './addNewMenuItem/duck/addMenuItemActions';
import { cartActions } from '../cart/duck';
import styles from './Menu.module.css';

const getCategoryFromProps = props =>
  queryString.parse(props.location.search).category;

class MenuContainer extends Component {
  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const {
      fetchMenuItems,
      getFilterByCategory,
      fetchAvailableCategories,
      availableCategories,
      clearBufferList,
      bufferDishList,
    } = this.props;
    const category = getCategoryFromProps(this.props);

    if (availableCategories.length < 1) {
      fetchAvailableCategories();
    }
    getFilterByCategory(category);
    if (bufferDishList.length >= 1) {
      clearBufferList();
    }

    return fetchMenuItems(category);
  }

  handleModalOpen = () => {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
    });
  };

  render() {
    const { isModalOpen } = this.state;
    // const { dishList, bufferDishList } = this.props;
    const { availableCategories } = this.props;

    return (
      <>
        {isModalOpen ? (
          <Modal onClose={this.handleModalOpen}>
            <AddMenuItem
              categoriesOption={availableCategories}
              onGoBack={this.handleModalOpen}
            />
          </Modal>
        ) : (
          <button
            type="button"
            className={styles.addDishBtn}
            onClick={this.handleModalOpen}
          />
        )}
        <Menu {...this.props} />
      </>
    );
  }
}
const mapStateToProps = state => ({
  dishList: menuSelectors.getDishListwithBuffer(state),
  availableCategories: menuSelectors.getAvailableCategories(state),
  filterByCategory: menuSelectors.getFilterByCategory(state),
  filterByName: menuSelectors.getFilterByName(state),
  isLoading: menuSelectors.getIsLoading(state),
  bufferDishList: menuSelectors.getBufferDishList(state),
});
const mapDispatchToProps = {
  onAddToCart: cartActions.addToCart,
  fetchMenuItems: menuOperations.fetchMenuItems,
  fetchAvailableCategories: menuOperations.fetchAvailableCategories,
  onCategoryChange: menuActions.changeCategoryFilter,
  onClearCategorySelector: menuActions.clearCategoryFilter,
  getFilterByCategory: menuActions.getCategoryFilter,
  onFilterByNameChange: menuActions.changeNameFilter,
  clearBufferList: addMenuItemActions.clearBufferList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuContainer);
