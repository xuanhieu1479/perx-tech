import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { getUserRepositories, getUserOrganizations } from '../../redux/user/action';
import ListContainer from '../List/ListContainer';
import './style.scss';

const MainPage = () => {
	const dispatch = useDispatch();
	const repos = useSelector(state => state.user.repo);
	const orgs = useSelector(state => state.user.org);
	const [username, setUsername] = useState()

	const onChangeUsername = (event) => setUsername(event.target.value);

	const onFinish = () => {
		getUserRepositories(dispatch, username);
		getUserOrganizations(dispatch, username);
	}

	const getRepoData = () => repos.map(repo => ({
		name: repo.name,
		url: repo.html_url,
	}));

	const getOrgData = () => orgs.map(org => ({
		name: org.login,
		url: org.url.replace('api.', ''),
	}));

	return (
		<section className="main-page__layout">
			<article className="main-page__user-input">
				<Form onFinish={onFinish}>
					<Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
						<Input value={username} onChange={onChangeUsername} placeholder="Input username here" />
					</Form.Item>
					<Button type="primary" htmlType="submit" className="search-btn">Search</Button>
				</Form>
			</article>
			<section className="main-page__list-container">
				<ListContainer data={getRepoData()} headerText="Repositories" />
				<ListContainer data={getOrgData()} headerText="Organizations" />
			</section>
		</section >
	);
};

export default MainPage;