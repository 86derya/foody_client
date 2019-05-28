import types from '../menuActionsTypes';

export default function entityReducer(state = {}, { type, payload }) {
  switch (type) {
    case types.MENU_FETCH_SUCCESS:
      return payload.entities;

    // case addmenuItemTypes.ADD_MENU_ITEM_FETCH_SUCCESS:
    //   // console.log([...state, payload._id: {payload}]);

    //   return {...state, (payload._id: { ...payload })};

    // // case types.DELETE_SUCCESS:
    // //   return state.filter(item => item.id !== payload);

    default:
      return state;
  }
}
