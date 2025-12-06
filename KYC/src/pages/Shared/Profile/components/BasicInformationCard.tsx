import Card from '@/components/card';
import Input from '../../../../components/input';
import type { BasicInformation } from '../types';
import Title from '@/components/title';

interface BasicInformationCardProps {
  data: BasicInformation;
  isReadOnly: boolean;
  onChange: (field: string, value: string) => void;
}

export default function BasicInformationCard({ data, isReadOnly, onChange }: BasicInformationCardProps) {
  return (
    <Card>
      <Title text="Basic Information" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label="First Name *"
        value={data.firstName}
        onChange={(e) => onChange('firstName', e.target.value)}
        disabled={isReadOnly}
        required
      />
      <Input
        label="Middle Name"
        value={data.middleName}
        onChange={(e) => onChange('middleName', e.target.value)}
        disabled={isReadOnly}
      />
      <Input
        label="Last Name *"
        value={data.lastName}
        onChange={(e) => onChange('lastName', e.target.value)}
        disabled={isReadOnly}
        required
      />
      <Input
        label="Date of Birth (DD/MM/YYYY) *"
        value={data.dateOfBirth}
        onChange={(e) => onChange('dateOfBirth', e.target.value)}
        placeholder="DD/MM/YYYY"
        disabled={isReadOnly}
        required
      />
      <Input
        label="Age"
        value={data.age.toString()}
        disabled
        readOnly
      />
    </div>
    </Card>
  );
}
