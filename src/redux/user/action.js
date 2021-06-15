import axios from 'axios';
import { GET_REPOSITORIES, GET_ORGANIZATIONS } from './type';
import { SUCCESS } from '../../constants/httpStatus';
import openNotification from '../../helper/notification';

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

const getUserRepoAndOrg = async (dispatch, username) => {
	try {
		await getUserRepositories(dispatch, username);
		await getUserOrganizations(dispatch, username);
		openNotification({
			message: 'Success',
			type: 'success',
		})
	} catch (error) {
		openNotification({
			message: 'Something went wrong',
			description: error.response.data.message || error,
			type: 'error',
		})
	}
}

const searchUser = async (username) => {
	const limit = 100;
	const { data } = await axios.get(`search/users?per_page=${limit}&q=${username}`);
	return data;
}

export { getUserRepoAndOrg, searchUser };