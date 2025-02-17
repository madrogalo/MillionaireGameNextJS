import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AnswerOption } from '@/components/AnswerOption/AnswerOption';

describe('AnswerOption Component', () => {
  const mockClickHandler = jest.fn();

  it('renders with the correct label and text', () => {
    render(
      <AnswerOption label="A" text="Answer 1" onClick={mockClickHandler} />,
    );

    const labelElement = screen.getByText('A');
    const textElement = screen.getByText('Answer 1');

    expect(labelElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('applies the correct default state', () => {
    render(
      <AnswerOption label="B" text="Answer 2" onClick={mockClickHandler} />,
    );

    const optionElement = screen
      .getByText('Answer 2')
      .closest('div')?.parentElement;

    expect(optionElement).toHaveClass('inactive');
  });

  it('applies the correct state when provided', () => {
    render(
      <AnswerOption
        label="C"
        text="Answer 3"
        state="selected"
        onClick={mockClickHandler}
      />,
    );

    const optionElement = screen
      .getByText('Answer 3')
      .closest('div')?.parentElement;

    expect(optionElement).toHaveClass('selected');
  });

  it('calls onClick when clicked', () => {
    render(
      <AnswerOption label="D" text="Answer 4" onClick={mockClickHandler} />,
    );

    const optionElement = screen
      .getByText('Answer 4')
      .closest('div')?.parentElement;

    if (optionElement) {
      fireEvent.click(optionElement);
    }

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
