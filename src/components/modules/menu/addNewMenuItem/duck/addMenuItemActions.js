import types from './addMenuItemActionsTypes';

const fetchRequest = () => ({
  type: types.ADD_MENU_ITEM_FETCH_REQUEST,
});

const fetchSuccess = menuItem => ({
  type: types.ADD_MENU_ITEM_FETCH_SUCCESS,
  payload: menuItem,
});

const fetchError = error => ({
  type: types.AVAILABLE_CATEGORIES_FETCH_ERROR,
  payload: error,
});
const clearBufferList = () => ({
  type: types.BUFFER_DISH_LIST_CLEAR,
  payload: '',
});

export default {
  fetchRequest,
  fetchSuccess,
  fetchError,
  clearBufferList,
};
