import { render, screen, fireEvent } from '@testing-library/react';
import BaseModal from '../BaseModal';

describe('BaseModal', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should render when open', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(<BaseModal {...defaultProps} open={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should call onClose when close button clicked', () => {
    render(<BaseModal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render title when provided', () => {
    const title = 'Test Modal';
    render(<BaseModal {...defaultProps} title={title} />);
    expect(screen.getByRole('heading')).toHaveTextContent(title);
  });

  it('should not render title when not provided', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should render children content', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should use custom testId when provided', () => {
    const testId = 'custom-modal';
    render(<BaseModal {...defaultProps} data-testid={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should not close when clicking modal content', () => {
    render(<BaseModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Modal Content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should call onClose when Escape key is pressed', () => {
    render(<BaseModal {...defaultProps} />);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when clicking backdrop', () => {
    render(<BaseModal {...defaultProps} />);
    const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });
});
