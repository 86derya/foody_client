import axios from 'axios';
import baseURL from '../../../../../configs/serverUrl';

const setBaseURL = () => {
  axios.defaults.baseURL = baseURL;
};

const getAvailableIngredients = async () => {
  setBaseURL();
  const response = await axios.get('/ingredients');
  return response;
};
export default getAvailableIngredients;
