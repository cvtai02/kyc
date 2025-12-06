import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '.';

describe('Loader Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Loader />);
    expect(container).toBeInTheDocument();
  });

  it('renders bouncing dots', () => {
    const { container } = render(<Loader />);
    const bouncingDots = container.querySelectorAll('.animate-bounce');
    expect(bouncingDots).toHaveLength(3);
  });

  it('renders dots with different colors', () => {
    const { container } = render(<Loader />);
    const blueDot = container.querySelector('.bg-blue-500');
    const purpleDot = container.querySelector('.bg-purple-500');
    const pinkDot = container.querySelector('.bg-pink-500');
    
    expect(blueDot).toBeInTheDocument();
    expect(purpleDot).toBeInTheDocument();
    expect(pinkDot).toBeInTheDocument();
  });

  it('renders spinning circles', () => {
    const { container } = render(<Loader />);
    const spinningCircles = container.querySelectorAll('.animate-spin');
    expect(spinningCircles.length).toBeGreaterThan(0);
  });

  it('renders progress bar container', () => {
    const { container } = render(<Loader />);
    const progressBar = container.querySelector('.bg-gray-200');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders with proper structure', () => {
    const { container } = render(<Loader />);
    const mainContainer = container.querySelector('.min-h-screen');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
  });

  it('applies animation delays to dots', () => {
    const { container } = render(<Loader />);
    const dots = container.querySelectorAll('.animate-bounce');
    
    expect(dots[0]).toHaveStyle({ animationDelay: '0ms' });
    expect(dots[1]).toHaveStyle({ animationDelay: '150ms' });
    expect(dots[2]).toHaveStyle({ animationDelay: '300ms' });
  });
});
