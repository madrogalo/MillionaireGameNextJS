import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QuestionBox } from '@/components/QuestionBox';

describe('QuestionBox Component', () => {
  it('should render the question', () => {
    render(<QuestionBox question="What is the capital of France?" />);

    const questionElement = screen.queryByText(
      'What is the capital of France?',
    );

    expect(questionElement).toBeInTheDocument();
  });
});
