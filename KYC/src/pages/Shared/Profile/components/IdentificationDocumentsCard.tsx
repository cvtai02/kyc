import Card from '@/components/card';
import Title from '@/components/title';
import Input from '../../../../components/input';

interface IdentificationDocumentsCardProps {
  ssn: string;
  ein: string;
  isReadOnly: boolean;
  onUpdate: (field: string, value: string) => void;
}

export default function IdentificationDocumentsCard({ ssn, ein, isReadOnly, onUpdate }: IdentificationDocumentsCardProps) {
  return (
    <Card>
      <Title text="Identification Documents" />
      <p className="text-sm text-gray-600 mb-4">Social Security Number and Employer Identification Number</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Social Security Number (SSN) *"
          value={ssn}
          onChange={(e) => onUpdate('ssn', e.target.value)}
          disabled={isReadOnly}
          required
          placeholder="XXX-XX-XXXX"
        />
        <Input
          label="Employer Identification Number (EIN) *"
          value={ein}
          onChange={(e) => onUpdate('ein', e.target.value)}
          disabled={isReadOnly}
          required
          placeholder="XX-XXXXXXX"
        />
      </div>
    </Card>
  );
}
