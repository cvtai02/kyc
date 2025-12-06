import Card from '@/components/card';
import Title from '@/components/title';
import Input from '../../../../components/input';
import Select from '../../../../components/select/select';
import Button from '../../../../components/button';
import type { Phone } from '../types';

interface PhonesCardProps {
  phones: Phone[];
  isReadOnly: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof Phone, value: string | boolean) => void;
}

export default function PhonesCard({ phones, isReadOnly, onAdd, onRemove, onUpdate }: PhonesCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Phone Numbers" />
        {!isReadOnly && (
          <Button variant="secondary" onClick={onAdd}>
            + Add Phone
          </Button>
        )}
      </div>
      {phones.map((phone, index) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Number *"
            type="tel"
            value={phone.number}
            onChange={(e) => onUpdate(index, 'number', e.target.value)}
            disabled={isReadOnly}
            required
          />
          <Select
            label="Type *"
            value={phone.type}
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
                checked={phone.preferred}
                onChange={(e) => onUpdate(index, 'preferred', e.target.checked)}
                disabled={isReadOnly}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Preferred</span>
            </label>
            {!isReadOnly && phones.length > 1 && (
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
