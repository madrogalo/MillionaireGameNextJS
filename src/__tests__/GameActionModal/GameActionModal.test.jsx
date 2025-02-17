import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameActionModal } from '@/components/GameActionModal';

describe('GameActionModal Component', () => {
  const mockOnStart = jest.fn();
  const mockOnRestart = jest.fn();

  it('does not render when isOpen is false', () => {
    render(
      <GameActionModal
        isOpen={false}
        title="Game Over"
        onStart={mockOnStart}
        onRestart={mockOnRestart}
      />,
    );

    const modalElement = screen.queryByText('Game Over');
    expect(modalElement).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    render(
      <GameActionModal
        isOpen={true}
        title="Welcome to the game"
        onStart={mockOnStart}
        onRestart={mockOnRestart}
      />,
    );

    expect(screen.getByText('Welcome to the game')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
  });

  it('renders "Try again" button when game is finished', () => {
    render(
      <GameActionModal
        isOpen={true}
        title="Game Over"
        isGameFinished={true}
        onStart={mockOnStart}
        onRestart={mockOnRestart}
      />,
    );

    expect(screen.getByText('Total score:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Try again/i }),
    ).toBeInTheDocument();
  });

  it('calls onStart when "Start" button is clicked', () => {
    render(
      <GameActionModal
        isOpen={true}
        title="Welcome to the game"
        onStart={mockOnStart}
        onRestart={mockOnRestart}
      />,
    );

    const startButton = screen.getByRole('button', { name: /Start/i });
    fireEvent.click(startButton);

    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });

  it('calls onRestart when "Try again" button is clicked', () => {
    render(
      <GameActionModal
        isOpen={true}
        title="Game Over"
        isGameFinished={true}
        onStart={mockOnStart}
        onRestart={mockOnRestart}
      />,
    );

    const restartButton = screen.getByRole('button', { name: /Try again/i });
    fireEvent.click(restartButton);

    expect(mockOnRestart).toHaveBeenCalledTimes(1);
  });
});
