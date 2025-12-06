import Card from '@/components/card';
import Title from '@/components/title';
import Input from '../../../../components/input';

interface PhonesCardProps {
  phone: string;
  isReadOnly: boolean;
  onUpdate: (value: string) => void;
}

export default function PhonesCard({ phone, isReadOnly, onUpdate }: PhonesCardProps) {
  return (
    <Card>
      <Title text="Phone Number" />
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Number *"
          type="tel"
          value={phone}
          onChange={(e) => onUpdate(e.target.value)}
          disabled={isReadOnly}
          required
        />
      </div>
    </Card>
  );
}
