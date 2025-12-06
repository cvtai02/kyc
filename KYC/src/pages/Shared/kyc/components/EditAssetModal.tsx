import { useState, useEffect } from 'react';
import Modal from '@/components/modal';
import Input from '@/components/input';
import Select from '@/components/select';
import Button from '@/components/button';
import type { Asset } from '../types';

interface EditAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset;
  onSave: (asset: Asset) => void;
}

const assetTypeOptions = [
  { value: 'Bond', label: 'Bond' },
  { value: 'Liquidity', label: 'Liquidity' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Others', label: 'Others' },
];

export default function EditAssetModal({
  isOpen,
  onClose,
  asset,
  onSave,
}: EditAssetModalProps) {
  const [formData, setFormData] = useState<Asset>(asset);

  useEffect(() => {
    setFormData(asset);
  }, [asset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'amount' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Asset" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={assetTypeOptions}
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
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
