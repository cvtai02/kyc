import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './index';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <p>Modal content</p>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = 'unset';
  });

  it('renders children content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText(/modal content/i)).not.toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    expect(screen.getByText(/test modal/i)).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    render(<Modal {...defaultProps} />);
    const title = screen.queryByRole('heading');
    expect(title).not.toBeInTheDocument();
  });

  it('applies correct size class for sm size', () => {
    const { container } = render(<Modal {...defaultProps} size="sm" />);
    const card = container.querySelector('.max-w-sm');
    expect(card).toBeInTheDocument();
  });

  it('applies correct size class for md size (default)', () => {
    const { container } = render(<Modal {...defaultProps} />);
    const card = container.querySelector('.max-w-md');
    expect(card).toBeInTheDocument();
  });

  it('applies correct size class for lg size', () => {
    const { container } = render(<Modal {...defaultProps} size="lg" />);
    const card = container.querySelector('.max-w-lg');
    expect(card).toBeInTheDocument();
  });

  it('applies correct size class for xl size', () => {
    const { container } = render(<Modal {...defaultProps} size="xl" />);
    const card = container.querySelector('.max-w-xl');
    expect(card).toBeInTheDocument();
  });

  it('applies correct size class for xxl size', () => {
    const { container } = render(<Modal {...defaultProps} size="xxl" />);
    const card = container.querySelector('.max-w-2xl');
    expect(card).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Modal {...defaultProps} className="custom-modal" />);
    const card = container.querySelector('.custom-modal');
    expect(card).toBeInTheDocument();
  });

  it('sets body overflow to hidden when modal is open', () => {
    render(<Modal {...defaultProps} isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('resets body overflow when modal is closed', () => {
    const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<Modal {...defaultProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('unset');
  });

  it('resets body overflow on unmount', () => {
    const { unmount } = render(<Modal {...defaultProps} isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');
    
    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });

  it('calls onClose when backdrop is clicked and closeOnBackdropClick is true', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnBackdropClick={true} />);
    
    const backdrop = screen.getByRole('dialog');
    await user.click(backdrop);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when backdrop is clicked and closeOnBackdropClick is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnBackdropClick={false} />);
    
    const backdrop = screen.getByRole('dialog');
    await user.click(backdrop);
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when modal content is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    const content = screen.getByText(/modal content/i);
    await user.click(content);
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    await user.keyboard('{Escape}');
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when other keys are pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    await user.keyboard('{Enter}');
    await user.keyboard('{Space}');
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('has proper ARIA attributes', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    const dialog = screen.getByRole('dialog');
    
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('does not have aria-labelledby when title is not provided', () => {
    render(<Modal {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  it('renders complex children correctly', () => {
    render(
      <Modal {...defaultProps}>
        <div>
          <h3>Complex Content</h3>
          <p>Description</p>
          <button>Action</button>
        </div>
      </Modal>
    );
    
    expect(screen.getByText(/complex content/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<Modal {...defaultProps} />);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
