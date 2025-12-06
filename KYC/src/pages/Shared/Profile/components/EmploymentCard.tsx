import Card from '@/components/card';
import Title from '@/components/title';
import Input from '../../../../components/input';
import type { User } from '../types';

interface EmploymentCardProps {
  company: User['company'];
  isReadOnly: boolean;
  onUpdate: (field: string, value: string) => void;
}

export default function EmploymentCard({ company, isReadOnly, onUpdate }: EmploymentCardProps) {
  return (
    <Card>
      <Title text="Occupation and Employment Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name *"
          value={company.name}
          onChange={(e) => onUpdate('name', e.target.value)}
          disabled={isReadOnly}
          required
        />
        <Input
          label="Department *"
          value={company.department}
          onChange={(e) => onUpdate('department', e.target.value)}
          disabled={isReadOnly}
          required
        />
        <Input
          label="Job Title *"
          value={company.title}
          onChange={(e) => onUpdate('title', e.target.value)}
          disabled={isReadOnly}
          required
        />
        <Input
          label="Office Address"
          value={company.address.address}
          onChange={(e) => onUpdate('address', e.target.value)}
          disabled={isReadOnly}
        />
      </div>
    </Card>
  );
}
