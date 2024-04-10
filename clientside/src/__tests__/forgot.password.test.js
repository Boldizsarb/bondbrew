import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import ResetPassword from '../pages/resetPassword/resetPassword';// Mocking fetch and react-router-dom hooks
import { act } from 'react-dom/test-utils';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use actual for all non-hook parts
    useParams: () => ({
        id: '123',
        token: 'token123',
    }),
    useNavigate: () => jest.fn(),
}));

describe('ResetPassword Component', () => {
    beforeEach(() => {
        // Mock global fetch so we control the responses
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ firstname: 'John' }),
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    beforeAll(() => {
        // Mock window.alert
        window.alert = jest.fn();
      });

    test('renders reset password form and allows password update', async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/reset-password/123/token123']}>
                    <Routes>
                        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
                    </Routes>
                </MemoryRouter>
            );
        });
        // Verify the form is rendered
        expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();

        // Simulate user typing in the new password and confirm password
        fireEvent.change(screen.getByPlaceholderText('Insert new Passphrase'), { target: { value: 'Password123!' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm new Passphrase'), { target: { value: 'Password123!' } });

        // Mock the fetch call for updating the password
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
            })
        );

        // Click the update button
        fireEvent.click(screen.getByText(/Update/i));

        // Expect fetch to have been called for password update
        expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ _id: '123', password: 'Password123!' }),
        }));

        // You might need to wait for any asynchronous actions to settle
        await screen.findByText(/Password updated successfully/i);
    });
});