import { useState } from 'react';
import Modal from '@/components/modal';
import Input from '@/components/input';
import Select from '@/components/select';
import Button from '@/components/button';
import type { Income } from '../types';

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (income: Income) => void;
}

const incomeTypeOptions = [
  { value: 'Salary', label: 'Salary' },
  { value: 'Investment', label: 'Investment' },
  { value: 'Others', label: 'Others' },
];

export default function AddIncomeModal({
  isOpen,
  onClose,
  onAdd,
}: AddIncomeModalProps) {
  const [formData, setFormData] = useState<Income>({
    type: 'Salary',
    amount: 0,
    currency: 'USD',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'amount' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ type: 'Salary', amount: 0, currency: 'USD' });
    onClose();
  };

  const handleCancel = () => {
    setFormData({ type: 'Salary', amount: 0, currency: 'USD' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Income" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={incomeTypeOptions}
            required
          />
          <Input
            label="Amount (USD)"
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Add Income
          </Button>
        </div>
      </form>
    </Modal>
  );
}
