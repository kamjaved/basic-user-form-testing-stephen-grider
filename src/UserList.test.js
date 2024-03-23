import { render, screen, waitFor, within } from '@testing-library/react';
import UserForm from './UserForm.js';
import userEvent from '@testing-library/user-event';
import UserList from './UserList.js';

describe('USER LIST', () => {
	const userList = [
		{ name: 'Jane', email: 'jane@gmail.com' },
		{ name: 'John', email: 'john@gmail.com' },
	];

	it('should render Header of userlist component correctly', () => {
		render(<UserList users={userList} />);

		const nameHeader = screen.getByRole('columnheader', {
			name: /name/i,
		});

		const emailHeader = screen.getByRole('columnheader', {
			name: /email/i,
		});

		expect(nameHeader).toBeInTheDocument();
		expect(emailHeader).toBeInTheDocument();
	});

	it('should render userlist when providing userList array', () => {
		render(<UserList users={userList} />);

		const rows = within(screen.getByTestId('users-row')).getAllByRole('row');

		expect(rows).toHaveLength(2);
	});

	it('should render user & email for each row', () => {
		render(<UserList users={userList} />);

		for (let user of userList) {
			const name = screen.getByRole('cell', { name: user.name });
			const email = screen.getByRole('cell', { name: user.email });

			expect(name).toBeInTheDocument();
			expect(email).toBeInTheDocument();
		}
	});
});
