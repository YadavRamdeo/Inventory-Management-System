import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Admin Login heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Admin Login/i });
  expect(heading).toBeInTheDocument();
});
