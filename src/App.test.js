import { render, screen, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('APP COMPONENT', () => {
	it('can recieve new user and show in the list', () => {
		render(<App />);

		const nameInput = screen.getByRole('textbox', {
			name: /name/i,
		});
		const emailInput = screen.getByRole('textbox', {
			name: /email/i,
		});
		const submitButton = screen.getByRole('button', {
			name: /Add User/i,
		});

		//  STIMULATE NAME FILED
		userEvent.click(nameInput);
		userEvent.keyboard('Jane');

		//  STIMULATE EMAIL FILED
		userEvent.click(emailInput);
		userEvent.keyboard('jane@gmail.com');

		//  CLICKING OF BUTTON
		userEvent.click(submitButton);

		const name = screen.getByRole('cell', { name: 'Jane' });
		const email = screen.getByRole('cell', { name: 'jane@gmail.com' });

		expect(name).toBeInTheDocument();
		expect(email).toBeInTheDocument();
	});
});
