import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import store from '../../redux/store';
import initAxios from '../../config/initAxios';

const AllTheProviders = ({ children }) => {
	initAxios();

	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
}

const customRender = (ui, options) =>
	render(ui, { wrapper: AllTheProviders, ...options })

const preDefineMatchmedia = () => {
	global.matchMedia = global.matchMedia || function () {
		return {
			addListener: jest.fn(),
			removeListener: jest.fn(),
		};
	};
}

export * from '@testing-library/react'

export { customRender as render, preDefineMatchmedia }