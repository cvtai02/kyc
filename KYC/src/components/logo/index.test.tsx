import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Logo from './index';

describe('Logo Component', () => {
  it('renders logo image', () => {
    render(<Logo />);
    const img = screen.getByAltText('Logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/logo.png');
  });

  it('renders medium size by default', () => {
    render(<Logo />);
    const img = screen.getByAltText('Logo');
    expect(img).toHaveClass('h-12', 'w-12');
  });

  it('renders small size when specified', () => {
    render(<Logo size="sm" />);
    const img = screen.getByAltText('Logo');
    expect(img).toHaveClass('h-8', 'w-8');
  });

  it('renders large size when specified', () => {
    render(<Logo size="lg" />);
    const img = screen.getByAltText('Logo');
    expect(img).toHaveClass('h-20', 'w-20');
  });

  it('renders text when provided', () => {
    render(<Logo text="My App" />);
    expect(screen.getByText(/my app/i)).toBeInTheDocument();
  });

  it('does not render text when not provided', () => {
    const { container } = render(<Logo />);
    const heading = container.querySelector('h1');
    expect(heading).not.toBeInTheDocument();
  });

  it('applies correct text size for small logo with text', () => {
    render(<Logo size="sm" text="App" />);
    const heading = screen.getByText(/app/i);
    expect(heading).toHaveClass('text-xl');
  });

  it('applies correct text size for medium logo with text', () => {
    render(<Logo size="md" text="App" />);
    const heading = screen.getByText(/app/i);
    expect(heading).toHaveClass('text-2xl');
  });

  it('applies correct text size for large logo with text', () => {
    render(<Logo size="lg" text="App" />);
    const heading = screen.getByText(/app/i);
    expect(heading).toHaveClass('text-3xl');
  });

  it('applies custom className', () => {
    const { container } = render(<Logo className="custom-class" />);
    const logoContainer = container.firstChild;
    expect(logoContainer).toHaveClass('custom-class');
  });

  it('renders with flex layout', () => {
    const { container } = render(<Logo />);
    const logoContainer = container.firstChild;
    expect(logoContainer).toHaveClass('flex', 'items-center');
  });
});
