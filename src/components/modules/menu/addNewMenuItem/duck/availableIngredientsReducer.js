import types from './addMenuItemActionsTypes';

export default function availableIngredientsReducer(
  state = [],
  { type, payload },
) {
  switch (type) {
    case types.AVAILABLE_INGREDIENTS_FETCH_SUCCESS:
      return payload;

    default:
      return state;
  }
}
