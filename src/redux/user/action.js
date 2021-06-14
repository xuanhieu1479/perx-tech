import axios from 'axios';
import { GET_REPOSITORIES, GET_ORGANIZATIONS } from './type';
import { SUCCESS } from '../../constants/httpStatus';

const getUserRepositories = async (dispatch, username) => {
	const { data, status } = await axios.get(`users/${username}/repos`);
	if (status === SUCCESS) {
		dispatch({
			type: GET_REPOSITORIES,
			payload: data,
		})
	}
}

const getUserOrganizations = async (dispatch, username) => {
	const { data, status } = await axios.get(`users/${username}/orgs`);
	if (status === SUCCESS) {
		dispatch({
			type: GET_ORGANIZATIONS,
			payload: data,
		})
	}
}

export { getUserRepositories, getUserOrganizations };