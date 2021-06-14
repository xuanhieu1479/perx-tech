import axios from 'axios';

const initAxios = () => {
	axios.defaults.baseURL = 'https://api.github.com/';
};

export default initAxios;
