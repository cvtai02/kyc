import { useNavigate } from 'react-router-dom';
import Card from '../../../components/card';
import Title from '../../../components/title';
import ReadonlyTable, { type ColumnDefinition } from '../../../components/readonly-table';
import { useOfficerStore, type ReviewedResult } from '../store';

export default function ResultsPage() {
  const { results } = useOfficerStore();
  const navigate = useNavigate();

  const handleRowClick = (row: ReviewedResult) => {
    navigate(`/profile?id=${row.id}`);
  };

  const getFinalStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {status}
      </span>
    );
  };

  const columns: ColumnDefinition<ReviewedResult>[] = [
    {
      key: 'name',
      header: 'NAME',
    },
    {
      key: 'date',
      header: 'DATE',
    },
    {
      key: 'finalStatus',
      header: 'FINAL STATUS',
      render: (row) => getFinalStatusBadge(row.finalStatus),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <Card>
        <Title text="List of Reviewed Results" variant="large" />
        <ReadonlyTable columns={columns} data={results} onRowClick={handleRowClick} />
      </Card>
    </div>
  );
}
