import { render, screen, waitFor } from '@testing-library/react';
import UserForm from './UserForm.js';
import userEvent from '@testing-library/user-event';

describe('USER FORM', () => {
	it('should render form correctly with all feild', () => {
		render(<UserForm />);

		const inputFields = screen.getAllByRole('textbox');
		const submitButton = screen.getByRole('button', {
			name: /Add User/i,
		});

		expect(inputFields).toHaveLength(2);
		expect(submitButton).toBeInTheDocument();
	});

	it('should call OnUserAdd Function when submit button clicked', () => {
		const mock = jest.fn();

		render(<UserForm onUserAdd={mock} />);

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

		expect(mock).toHaveBeenCalled();
		expect(mock).toHaveBeenCalledWith({
			name: 'Jane',
			email: 'jane@gmail.com',
		});
	});

	it('should empty the user & email feild after submit button clicked', () => {
		render(<UserForm onUserAdd={() => {}} />);

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

		expect(nameInput).toHaveValue('');
		expect(emailInput).toHaveValue('');
	});
});
