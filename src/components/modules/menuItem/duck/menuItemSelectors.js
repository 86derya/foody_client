const getUserName = state =>
  state.session.user ? state.session.user.nickName : null;
const getFilterByCategory = state => state.filterByCategory;
export default { getUserName, getFilterByCategory };
