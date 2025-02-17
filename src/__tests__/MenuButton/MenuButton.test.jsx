import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MenuButton } from '@/components/MenuButton';

describe('MenuButton', () => {
  const onClick = jest.fn();

  it('should render MenuButton variant menu', () => {
    render(<MenuButton variant="menu" onClick={onClick} />);
    const menuButtonElement = screen.getByRole('button');
    fireEvent.click(menuButtonElement);
    expect(menuButtonElement).toBeInTheDocument();
  });

  it('should render MenuButton variant close', () => {
    render(<MenuButton variant="close" onClick={onClick} />);
    const menuButtonElement = screen.getByRole('button');
    fireEvent.click(menuButtonElement);
    expect(menuButtonElement).toBeInTheDocument();
  });
});
