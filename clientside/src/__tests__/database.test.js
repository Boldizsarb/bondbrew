
 import NotFound from '../pages/notfound/notfound'; 
 import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; 
describe('NotFound Component', () => {
  test('should render a div with text and an image', () => {
    // Wrap NotFound component with MemoryRouter to provide context
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    // Now the tests continue as before
    expect(screen.getByRole('heading', { name: /404 Page not found!/i })).toBeInTheDocument();
    expect(screen.getByText("Oops! Looks like this link is a loner. Don't worry, you're not. Let's find our way back together.")).toBeInTheDocument();
    expect(screen.getByAltText('Home icon')).toBeInTheDocument();
  });
});