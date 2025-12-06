import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { appFetch } from '@/base/appFetch';
import { API_BASE_URL } from '@/base/constants';
import { useAuthStore } from '@/hooks/useAuthStore';
import Modal from '@/components/modal';
import Input from '@/components/input';
import Select from '@/components/select';
import Button from '@/components/button';

interface AddPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (phone: { number: string; type: string; preferred: boolean }) => void;
}

const phoneTypeOptions = [
  { value: 'Work', label: 'Work' },
  { value: 'Personal', label: 'Personal' },
];

const preferredOptions = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
];

export default function AddPhoneModal({
  isOpen,
  onClose,
  onAdd,
}: AddPhoneModalProps) {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    number: '',
    type: 'Work',
    preferred: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'preferred' ? value === 'true' : value 
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { number: string; type: string; preferred: boolean }) => {
      return appFetch(`${API_BASE_URL}/users/${user?.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      onAdd(formData);
      if (user) {
        setUser({ ...user, phone: formData.number });
      }
      setFormData({ number: '', type: 'Work', preferred: false });
      toast.success('Phone number added successfully!');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleCancel = () => {
    setFormData({ number: '', type: 'Work', preferred: false });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Phone Number" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2">
            <Input
              label="Phone Number"
              name="number"
              type="tel"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <Select
            label="Phone Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={phoneTypeOptions}
            required
          />
          <Select
            label="Preferred Phone"
            name="preferred"
            value={String(formData.preferred)}
            onChange={handleChange}
            options={preferredOptions}
            required
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending}>
            Add Phone
          </Button>
        </div>
      </form>
    </Modal>
  );
}
