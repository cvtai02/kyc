import { useNavigate } from 'react-router-dom';
import Card from '../../../components/card';
import Title from '../../../components/title';
import Button from '../../../components/button';
import ReadonlyTable, { type ColumnDefinition } from '../../../components/readonly-table';
import { useOfficerStore, type KYCSubmission } from '../store';

export default function PreviewPage() {
  const { submissions, approveSubmission, rejectSubmission } = useOfficerStore();
  const navigate = useNavigate();

  const handleRowClick = (row: KYCSubmission) => {
    navigate(`/profile?id=${row.id}`);
  };

  const handleApprove = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    approveSubmission(id);
  };

  const handleReject = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    rejectSubmission(id);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      Active: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Inactive: 'bg-red-100 text-red-800',
    };

    return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
        >
          {status}
        </span>
    );
  };

  const columns: ColumnDefinition<KYCSubmission>[] = [
    {
      key: 'name',
      header: 'NAME',
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: 'date',
      header: 'DATE',
    },
    {
      key: 'actions',
      header: 'ACTIONS',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="primary"
            className="!py-1 !px-3 text-sm !bg-green-600 hover:!bg-green-700"
            onClick={(e) => handleApprove(row.id, e)}
          >
            Approve
          </Button>
          <Button
            variant="primary"
            className="!py-1 !px-3 text-sm !bg-red-600 hover:!bg-red-700"
            onClick={(e) => handleReject(row.id, e)}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className=" mx-auto">
      <Title text="KYC Submission" variant="large" />
      <ReadonlyTable columns={columns} data={submissions} onRowClick={handleRowClick} />
    </div>
  );
}
