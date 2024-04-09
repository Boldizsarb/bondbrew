import { render, fireEvent, screen } from '@testing-library/react';
import BurgerMenu from '../components/burgerMenu/burgerMenu';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
test('should render burger menu', () => {
    render(
        <MemoryRouter>
        <BurgerMenu />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Plans/i)).toBeInTheDocument();
    expect(screen.getByText(/Buddy Pairing/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/feedback/i)).toBeInTheDocument();
    expect(screen.getByText(/SentiMate/i)).toBeInTheDocument();
    });