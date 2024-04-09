import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store'; 
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Auth from '../pages/signup/signup.jsx'; // Adjust the import path to your file structure

// Mocking axios
jest.mock('axios', () => ({
    __esModule: true,
    default: {
      create: () => ({
        get: jest.fn(),
        post: jest.fn(),
      }),
    },
  }));


  const mockStore = configureMockStore(); //  morking the store
  
  describe('Auth Component', () => {
    let store;
  
    beforeEach(() => {
      store = mockStore({
        authReducer: {
          loading: false,
          error: null,
        },
      });
    });
  
    test('renders without crashing', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Auth />
          </MemoryRouter>
        </Provider>
      );

      

      const toggleButton = screen.getByText(/do not have an account yet\? brew one!/i);
      expect(toggleButton).toBeInTheDocument();
      fireEvent.click(toggleButton);
      expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    });
  
  });
  /////////////////////////////////////////////////////////////////////////////////

  jest.mock('react-redux', () => {
    const actualRedux = jest.requireActual('react-redux');
    return {
      ...actualRedux,
      useDispatch: () => jest.fn()
    };
  });
  

  let store; // mock store
  
  describe('Auth Component Tests', () => {
    beforeEach(() => {
      // Reset mocks and set initial store state for each test
      jest.clearAllMocks();
      store = mockStore({
        authReducer: {
          loading: false,
          error: null,
          // Add other initial state properties as needed
        },
        // Include other reducers here as necessary
      });
    });

    test('renders without crashing', () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <Auth />
            </MemoryRouter>
          </Provider>
        );
        const toggleButton = screen.getByText(/do not have an account yet\? brew one!/i);
        expect(toggleButton).toBeInTheDocument();
    
      });
    
  test('valid user details registration', () => { // checking dispatch, and password validation

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText(/do not have an account yet\? brew one!/i));
    // Fill in the user details
    fireEvent.change(screen.getByPlaceholderText(/email address/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Doe' } });

    const passwordFields = screen.getAllByPlaceholderText(/Password/i); // passsword first field 
    fireEvent.change(passwordFields[0], { target: { value: 'Test123!' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Test123!' } });

    fireEvent.click(screen.getByRole('button', { name: /Sginup/i })); // button 

  })
});