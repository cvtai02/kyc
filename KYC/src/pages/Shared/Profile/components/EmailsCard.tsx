import Card from '@/components/card';
import Title from '@/components/title';
import Input from '../../../../components/input';
import Select from '../../../../components/select/select';
import Button from '../../../../components/button';
import type { Email } from '../types';

interface EmailsCardProps {
  emails: Email[];
  isReadOnly: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof Email, value: string | boolean) => void;
}

export default function EmailsCard({ emails, isReadOnly, onAdd, onRemove, onUpdate }: EmailsCardProps) {
  return (
    <Card>
      <Title text="Email Addresses" />
      {!isReadOnly && (
        <Button variant="secondary" onClick={onAdd}>
          + Add Email
        </Button>
      )}
      {emails.map((email, index) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Email *"
            type="email"
            value={email.email}
            onChange={(e) => onUpdate(index, 'email', e.target.value)}
            disabled={isReadOnly}
            required
          />
          <Select
            label="Type *"
            value={email.type}
            onChange={(e) => onUpdate(index, 'type', e.target.value as 'Work' | 'Personal')}
            options={[
              { value: 'Personal', label: 'Personal' },
              { value: 'Work', label: 'Work' },
            ]}
            disabled={isReadOnly}
            required
          />
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={email.preferred}
                onChange={(e) => onUpdate(index, 'preferred', e.target.checked)}
                disabled={isReadOnly}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Preferred</span>
            </label>
            {!isReadOnly && emails.length > 1 && (
              <Button variant="secondary" onClick={() => onRemove(index)}>
                Remove
              </Button>
            )}
          </div>
        </div>
      ))}
    </Card>
  );
}
