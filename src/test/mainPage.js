import '@testing-library/jest-dom'
import React from 'react'
import { render, fireEvent, screen, waitFor } from './utils/test-utils'
import MainPage from '../components/MainPage/MainPage'

const testMainPage = () => {
	test("get user's repositories and organizations successfully", async () => {
		render(<MainPage />)

		fireEvent.change(screen.getByPlaceholderText('Input username here'), {
			target: { value: 'xuanhieu1479' },
		})

		const button = screen.getByRole('button');
		fireEvent.click(button);

		await waitFor(() => expect(screen.getByText('perx-tech')).toBeInTheDocument());
	})
};

export default testMainPage;