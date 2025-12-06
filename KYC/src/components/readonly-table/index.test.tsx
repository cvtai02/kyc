import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReadonlyTable, { type ColumnDefinition } from './index';

interface TestData {
  id: number;
  name: string;
  status: string;
}

describe('ReadonlyTable', () => {
  const mockData: TestData[] = [
    { id: 1, name: 'John Doe', status: 'Active' },
    { id: 2, name: 'Jane Smith', status: 'Pending' },
  ];

  const columns: ColumnDefinition<TestData>[] = [
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status' },
  ];

  it('renders table with headers', () => {
    render(<ReadonlyTable columns={columns} data={mockData} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders table data', () => {
    render(<ReadonlyTable columns={columns} data={mockData} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders custom cell content with render function', () => {
    const customColumns: ColumnDefinition<TestData>[] = [
      { key: 'name', header: 'Name' },
      {
        key: 'status',
        header: 'Status',
        render: (row) => <span className="custom">{row.status.toUpperCase()}</span>,
      },
    ];

    render(<ReadonlyTable columns={customColumns} data={mockData} />);
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
    expect(screen.getByText('PENDING')).toBeInTheDocument();
  });

  it('shows no data message when data is empty', () => {
    render(<ReadonlyTable columns={columns} data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
