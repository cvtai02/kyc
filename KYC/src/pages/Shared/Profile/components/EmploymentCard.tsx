import Card from '@/components/card';
import Title from '@/components/title';
import Input from '../../../../components/input';
import Button from '../../../../components/button';
import type { Employment } from '../types';

interface EmploymentCardProps {
  employments: Employment[];
  isReadOnly: boolean;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof Employment, value: string | number) => void;
}

export default function EmploymentCard({ employments, isReadOnly, onAdd, onRemove, onUpdate }: EmploymentCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Occupation and Employment Information" />
        {!isReadOnly && (
          <Button variant="secondary" onClick={onAdd}>
            + Add Employment
          </Button>
        )}
      </div>
      {employments.length === 0 ? (
        <p className="text-gray-500 italic">No employment information added</p>
      ) : (
        employments.map((employment, index) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Employer Name *"
              value={employment.name}
              onChange={(e) => onUpdate(index, 'name', e.target.value)}
              disabled={isReadOnly}
              required
            />
            <Input
              label="From Year (YYYY) *"
              type="number"
              value={employment.fromYear.toString()}
              onChange={(e) => onUpdate(index, 'fromYear', parseInt(e.target.value) || new Date().getFullYear())}
              disabled={isReadOnly}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
            <Input
              label="To Year (YYYY)"
              type="number"
              value={employment.toYear?.toString() || ''}
              onChange={(e) => onUpdate(index, 'toYear', e.target.value ? parseInt(e.target.value) : '')}
              disabled={isReadOnly}
              min={employment.fromYear + 1}
              max={new Date().getFullYear()}
            />
            {!isReadOnly && (
              <div className="flex items-end md:col-span-3">
                <Button variant="secondary" onClick={() => onRemove(index)}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        ))
      )}
    </Card>
  );
}
