import Card from '@/components/card';
import Input from '../../../../components/input';
import type { User } from '../types';
import Title from '@/components/title';

interface BasicInformationCardProps {
  data: User;
  isReadOnly: boolean;
  onChange: (field: string, value: string | number) => void;
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
          label="Maiden Name"
          value={data.maidenName}
          onChange={(e) => onChange('maidenName', e.target.value)}
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
          label="Date of Birth *"
          value={data.birthDate}
          onChange={(e) => onChange('birthDate', e.target.value)}
          placeholder="YYYY-MM-DD"
          disabled={isReadOnly}
          required
        />
        <Input
          label="Age"
          value={data.age.toString()}
          disabled
          readOnly
        />
        <Input
          label="Gender"
          value={data.gender}
          onChange={(e) => onChange('gender', e.target.value)}
          disabled={isReadOnly}
        />
      </div>
    </Card>
  );
}
