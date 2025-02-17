import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PrizeLadder } from '@/components/PrizeLadder';

describe('PrizeLadder Component', () => {
  it('should render the prize ladder', () => {
    render(<PrizeLadder prize={'$100'} />);
    const prizeLadder = screen.queryByText('$100');
    expect(prizeLadder).toBeInTheDocument();
  });

  it('should render the prize ladder with state "inactive"', () => {
    render(<PrizeLadder prize={'$200'} state="inactive" />);
    const prizeLadder = screen.queryByText('$200');

    expect(prizeLadder).toHaveClass('inactive');
    expect(prizeLadder).toBeInTheDocument();
  });

  it('should render the prize ladder with state "selected"', () => {
    render(<PrizeLadder prize={'$300'} state="selected" />);
    const prizeLadder = screen.queryByText('$300');

    expect(prizeLadder).toHaveClass('selected');
    expect(prizeLadder).toBeInTheDocument();
  });

  it('should render the prize ladder with state "correct"', () => {
    render(<PrizeLadder prize={'$400'} state="correct" />);
    const prizeLadder = screen.queryByText('$400');

    expect(prizeLadder).toHaveClass('correct');
    expect(prizeLadder).toBeInTheDocument();
  });
});
