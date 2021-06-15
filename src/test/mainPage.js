import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, waitFor } from './utils/test-utils'
import MainPage from '../components/MainPage/MainPage'

const mockUser = 'xuanhieu1479';
const notFoundUser = 'some_random_name_absolutely_does_not_exist';

const testMainPage = () => {
	test("get user's repositories and organizations successfully", async () => {
		render(<MainPage />)

		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: mockUser },
		})

		const button = screen.getByRole('button');
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText('Search success')).toBeInTheDocument()
		});
	})

	test("cannot find user", async () => {
		render(<MainPage />)

		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: notFoundUser },
		})

		const button = screen.getByRole('button');
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText('Not Found')).toBeInTheDocument()
		});
	})
};

export default testMainPage;