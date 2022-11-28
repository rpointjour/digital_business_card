import { render, screen } from '@testing-library/react';
import Menu from "../Menu";
// Test Resume link
test('renders Resume link', () => {
  render(<Menu />);
  const linkElement = screen.getByText(/Resume/i);
  expect(linkElement).toBeInTheDocument();
});
