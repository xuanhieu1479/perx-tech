import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, AutoComplete, Button } from 'antd';
import { getUserRepositories, getUserOrganizations, searchUser } from '../../redux/user/action';
import ListContainer from '../List/ListContainer';
import './style.scss';

const AT_LEAST_CHARS = 2;

const MainPage = () => {
	const dispatch = useDispatch();
	const repos = useSelector(state => state.user.repo);
	const orgs = useSelector(state => state.user.org);
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState()

	const formRef = useRef();

	const onChangeUsername = (value) => setUsername(value);
	const onSearchUser = async (value) => {
		if (value.length >= AT_LEAST_CHARS) {
			const data = await searchUser(value);
			setUsers(data.items.map(u => ({
				label: u.login,
				value: u.login,
			})));
		} else {
			setUsers([]);
		}
	}
	const onSelectUser = () => formRef.current.submit();

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
				<Form onFinish={onFinish} ref={formRef}>
					<Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
						<AutoComplete
							value={username}
							onChange={onChangeUsername}
							placeholder="Input username here"
							onSearch={onSearchUser}
							onSelect={onSelectUser}
							options={users}
						/>
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