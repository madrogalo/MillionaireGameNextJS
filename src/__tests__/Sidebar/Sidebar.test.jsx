import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '@/components/Sidebar';

describe('Sidebar Component', () => {
  const onCloseSidebar = jest.fn();
  it('should render the sidebar', () => {
    render(<Sidebar isOpen closeSidebar={onCloseSidebar} />);
    // screen.logTestingPlaygroundURL();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call closeSidebar when close button is clicked', () => {
    render(<Sidebar isOpen closeSidebar={onCloseSidebar} />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onCloseSidebar).toHaveBeenCalledTimes(1);
  });

  it('should render the sidebar when is mobile mode', () => {
    render(<Sidebar isOpen={false} closeSidebar={onCloseSidebar} />);
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });
});
