import type { ReactNode } from 'react';

export interface ColumnDefinition<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface ReadonlyTableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
}

export default function ReadonlyTable<T extends Record<string, any>>({
  columns,
  data,
  className = '',
  onRowClick,
}: ReadonlyTableProps<T>) {
  return (
    <div className={`w-full bg-background shadow-md rounded-xl overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className=" bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-gray-300 hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-4 text-sm text-left  ${column.className || ''}`}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
}
