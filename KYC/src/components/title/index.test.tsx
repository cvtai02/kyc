import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Title from './index';

describe('Title Component', () => {
  it('renders title text', () => {
    render(<Title text="Hello World" />);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it('renders as h1 element', () => {
    render(<Title text="Title" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders default variant with text-xl', () => {
    render(<Title text="Default Title" />);
    const heading = screen.getByText(/default title/i);
    expect(heading).toHaveClass('text-xl');
  });

  it('renders large variant with text-2xl', () => {
    render(<Title text="Large Title" variant="large" />);
    const heading = screen.getByText(/large title/i);
    expect(heading).toHaveClass('text-2xl');
  });

  it('renders highlight variant with text-hightlight', () => {
    render(<Title text="Highlight Title" variant="hightlight" />);
    const heading = screen.getByText(/highlight title/i);
    expect(heading).toHaveClass('text-hightlight');
  });

  it('applies custom className', () => {
    render(<Title text="Custom Title" className="custom-class" />);
    const heading = screen.getByText(/custom title/i);
    expect(heading).toHaveClass('custom-class');
  });

  it('applies common styling classes', () => {
    render(<Title text="Styled Title" />);
    const heading = screen.getByText(/styled title/i);
    expect(heading).toHaveClass('text-left', 'mb-4', 'font-bold');
  });

  it('combines variant and custom className', () => {
    render(<Title text="Combined" variant="large" className="extra-class" />);
    const heading = screen.getByText(/combined/i);
    expect(heading).toHaveClass('text-2xl', 'extra-class');
  });

  it('renders empty string text', () => {
    render(<Title text="" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('');
  });
});
