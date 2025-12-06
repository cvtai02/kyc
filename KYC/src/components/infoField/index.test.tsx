import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InfoField from './index';

describe('InfoField Component', () => {
  it('renders label and value', () => {
    render(<InfoField label="Name" value="John Doe" />);
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  it('renders with string value', () => {
    render(<InfoField label="Email" value="test@example.com" />);
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('renders with number value', () => {
    render(<InfoField label="Age" value={25} />);
    expect(screen.getByText(/age/i)).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('displays dash when value is empty string', () => {
    render(<InfoField label="Phone" value="" />);
    expect(screen.getByText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });


  it('applies correct styling classes', () => {
    const { container } = render(<InfoField label="Test" value="Value" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('border-l');
    expect(wrapper).toHaveClass('pl-1');
  });

  it('applies correct label styling', () => {
    render(<InfoField label="Label" value="Value" />);
    const label = screen.getByText(/label/i);
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('font-medium');
    expect(label).toHaveClass('text-secondary');
    expect(label).toHaveClass('mb-1');
  });

  it('applies correct value styling', () => {
    render(<InfoField label="Label" value="Test Value" />);
    const value = screen.getByText(/test value/i);
    expect(value).toHaveClass('text-base');
  });

  it('renders multiple InfoFields independently', () => {
    const { container } = render(
      <>
        <InfoField label="First Name" value="John" />
        <InfoField label="Last Name" value="Doe" />
        <InfoField label="Age" value={30} />
      </>
    );
    
    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/john/i)).toBeInTheDocument();
    expect(screen.getByText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText(/doe/i)).toBeInTheDocument();
    expect(screen.getByText(/age/i)).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    
    const infoFields = container.querySelectorAll('.border-l');
    expect(infoFields).toHaveLength(3);
  });
});
