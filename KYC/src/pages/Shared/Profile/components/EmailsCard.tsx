import Card from '@/components/card';
import Title from '@/components/title';
import Input from '../../../../components/input';

interface EmailsCardProps {
  email: string;
  isReadOnly: boolean;
  onUpdate: (value: string) => void;
}

export default function EmailsCard({ email, isReadOnly, onUpdate }: EmailsCardProps) {
  return (
    <Card>
      <Title text="Email Address" />
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Email *"
          type="email"
          value={email}
          onChange={(e) => onUpdate(e.target.value)}
          disabled={isReadOnly}
          required
        />
      </div>
    </Card>
  );
}
