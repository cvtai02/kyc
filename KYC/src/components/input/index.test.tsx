import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './index';

describe('Input Component', () => {
  it('renders input field', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('generates id from label when id is not provided', () => {
    render(<Input label="First Name" />);
    const input = screen.getByLabelText(/first name/i);
    expect(input).toHaveAttribute('id', 'first-name');
  });

  it('uses provided id over generated one', () => {
    render(<Input label="Username" id="custom-id" />);
    const input = screen.getByLabelText(/username/i);
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('displays error message when provided', () => {
    render(<Input errorMessage="This field is required" />);
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });

  it('applies error styling when errorMessage is present', () => {
    render(<Input errorMessage="Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('calls onChange handler when input changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={handleChange} />);
    
    await user.type(screen.getByRole('textbox'), 'a');
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('passes through HTML input props', () => {
    render(<Input placeholder="Enter text" type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders without label', () => {
    render(<Input placeholder="No label" />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/no label/i)).toBeInTheDocument();
  });
});
