import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '.';

describe('Select Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders select element', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<Select label="Country" options={mockOptions} />);
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  });

  it('renders default "Select..." option', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByText(/select\.\.\./i)).toBeInTheDocument();
  });

  it('renders all provided options', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('generates id from label when id is not provided', () => {
    render(<Select label="Select Country" options={mockOptions} />);
    const select = screen.getByLabelText(/select country/i);
    expect(select).toHaveAttribute('id', 'select-country');
  });

  it('uses provided id over generated one', () => {
    render(<Select label="Country" id="custom-id" options={mockOptions} />);
    const select = screen.getByLabelText(/country/i);
    expect(select).toHaveAttribute('id', 'custom-id');
  });

  it('displays error message when provided', () => {
    render(<Select options={mockOptions} errorMessage="This field is required" />);
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });

  it('applies error styling when errorMessage is present', () => {
    render(<Select options={mockOptions} errorMessage="Error" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-500');
  });

  it('allows selecting an option', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    
    await user.selectOptions(select, 'option2');
    expect(select).toHaveValue('option2');
  });

  it('calls onChange handler when selection changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={mockOptions} onChange={handleChange} />);
    
    await user.selectOptions(screen.getByRole('combobox'), 'option1');
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Select options={mockOptions} className="custom-class" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-class');
  });

  it('can be disabled', () => {
    render(<Select options={mockOptions} disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('passes through HTML select props', () => {
    render(<Select options={mockOptions} required data-testid="test-select" />);
    const select = screen.getByTestId('test-select');
    expect(select).toBeRequired();
  });

  it('renders without label', () => {
    render(<Select options={mockOptions} />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });
});
