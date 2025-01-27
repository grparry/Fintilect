import { render, screen, fireEvent } from '@testing-library/react';
import BaseModal from '@/BaseModal';

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
    expect(screen.getByRole('dialog')).toHaveClass('MuiDialog-root');
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
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('DIV');
    expect(titleElement).toHaveClass('MuiTypography-h6');
  });

  it('should not render title when not provided', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should render children content in DialogContent', () => {
    render(<BaseModal {...defaultProps} />);
    const content = screen.getByText('Modal Content');
    expect(content).toBeInTheDocument();
    expect(content.closest('.MuiDialogContent-root')).toBeInTheDocument();
    expect(content.closest('.MuiDialogContent-root')).toHaveClass('MuiDialogContent-dividers');
  });

  it('should use custom testId when provided', () => {
    const testId = 'custom-modal';
    render(<BaseModal {...defaultProps} data-testid={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should use default testId when not provided', () => {
    render(<BaseModal {...defaultProps} />);
    expect(screen.getByTestId('base-modal')).toBeInTheDocument();
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
    const backdrop = document.querySelector('.MuiBackdrop-root');
    expect(backdrop).toBeInTheDocument();
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('should render with correct modal props', () => {
    render(<BaseModal {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    const paper = dialog.querySelector('.MuiPaper-root');
    
    expect(paper).toHaveStyle({
      borderRadius: '16px' // theme.shape.borderRadius * 2
    });
  });
});
