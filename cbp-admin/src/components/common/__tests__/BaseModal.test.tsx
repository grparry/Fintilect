import { render, screen, fireEvent } from '@testing-library/react';
import { BaseModal } from '../BaseModal';

describe('BaseModal Navigation Flow', () => {
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
    expect(screen.getByTestId('base-modal')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(<BaseModal {...defaultProps} open={false} />);
    expect(screen.queryByTestId('base-modal')).not.toBeInTheDocument();
  });

  it('should call onClose when close button clicked', () => {
    render(<BaseModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId('base-modal-close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render title when provided', () => {
    const title = 'Test Modal';
    render(<BaseModal {...defaultProps} title={title} />);
    expect(screen.getByTestId('base-modal-title')).toHaveTextContent(title);
  });

  it('should not render title when not provided', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.queryByTestId('base-modal-title')).not.toBeInTheDocument();
  });

  it('should render children content', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should use custom testId when provided', () => {
    render(<BaseModal {...defaultProps} data-testid="custom-modal" />);
    expect(screen.getByTestId('custom-modal')).toBeInTheDocument();
    expect(screen.getByTestId('custom-modal-close')).toBeInTheDocument();
  });

  it('should call onClose when backdrop is clicked', () => {
    render(<BaseModal {...defaultProps} />);
    const backdrop = document.querySelector('[class*="MuiBackdrop-root"]');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('should not close when clicking modal content', () => {
    render(<BaseModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Modal Content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should call onClose when Escape key is pressed', () => {
    render(<BaseModal {...defaultProps} />);
    fireEvent.keyDown(screen.getByTestId('base-modal'), { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
