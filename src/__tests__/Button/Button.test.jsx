import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/Button/Button';

describe('Button Component', () => {
  it('renders with the correct title', () => {
    const mockClickHandler = jest.fn();
    render(<Button title="Click me" onClick={mockClickHandler} />);

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockClickHandler = jest.fn();
    render(<Button title="Click me" onClick={mockClickHandler} />);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(buttonElement);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
