import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './index';

describe('Card Component', () => {
  it('renders children content', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText(/card content/i)).toBeInTheDocument();
  });

  it('applies default classes', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    );
    const card = container.firstChild;
    expect(card).toHaveClass('bg-background');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('p-6');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Content</p>
      </Card>
    );
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  it('renders multiple children', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Description</p>
        <button>Action</button>
      </Card>
    );
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  it('maintains full width', () => {
    const { container } = render(
      <Card>
        <p>Content</p>
      </Card>
    );
    const card = container.firstChild;
    expect(card).toHaveClass('w-full');
  });
});
