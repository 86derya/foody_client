import types from './addMenuItemActionsTypes';

export default function tempDishlist(state = [], { type, payload }) {
  switch (type) {
    case types.ADD_MENU_ITEM_FETCH_SUCCESS:
      return [...state, payload];
    case types.BUFFER_DISH_LIST_CLEAR:
      return payload;

    default:
      return state;
  }
}
