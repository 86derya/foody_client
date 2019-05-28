import axios from 'axios';
import baseURL from '../../../../../configs/serverUrl';

const setBaseURL = () => {
  axios.defaults.baseURL = baseURL;
};

const postMenuItem = async newItem => {
  setBaseURL();
  const response = await axios.post('/menu', newItem);
  return response;
};
export default postMenuItem;
