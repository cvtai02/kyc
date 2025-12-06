import { useState } from 'react';
import Modal from '@/components/modal';
import Input from '@/components/input';
import Select from '@/components/select';
import Button from '@/components/button';
import type { Liability } from '../types';

interface AddLiabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (liability: Liability) => void;
}

const liabilityTypeOptions = [
  { value: 'Personal Loan', label: 'Personal Loan' },
  { value: 'Real Estate Loan', label: 'Real Estate Loan' },
  { value: 'Others', label: 'Others' },
];

export default function AddLiabilityModal({
  isOpen,
  onClose,
  onAdd,
}: AddLiabilityModalProps) {
  const [formData, setFormData] = useState<Liability>({
    type: 'Personal Loan',
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
    setFormData({ type: 'Personal Loan', amount: 0, currency: 'USD' });
    onClose();
  };

  const handleCancel = () => {
    setFormData({ type: 'Personal Loan', amount: 0, currency: 'USD' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Liability" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={liabilityTypeOptions}
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
            Add Liability
          </Button>
        </div>
      </form>
    </Modal>
  );
}
