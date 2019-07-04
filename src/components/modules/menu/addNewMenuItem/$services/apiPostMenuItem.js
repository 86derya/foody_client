import axios from 'axios';
import baseURL from '../../../../../configs/serverUrl';

const setBaseURL = () => {
  axios.defaults.baseURL = baseURL;
};
const options = {
  contentType: 'multipart/form-data',
};

const postMenuItem = async data => {
  setBaseURL();
  const response = await axios.post('/menu', data, options);
  return response;
};
export default postMenuItem;
