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

interface AddEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (email: { email: string; type: string; preferred: boolean }) => void;
}

const emailTypeOptions = [
  { value: 'Work', label: 'Work' },
  { value: 'Personal', label: 'Personal' },
];

const preferredOptions = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
];

export default function AddEmailModal({
  isOpen,
  onClose,
  onAdd,
}: AddEmailModalProps) {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
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
    mutationFn: async (data: { email: string; type: string; preferred: boolean }) => {
      return appFetch(`${API_BASE_URL}/users/${user?.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      onAdd(formData);
      if (user) {
        setUser({ ...user, email: formData.email });
      }
      setFormData({ email: '', type: 'Work', preferred: false });
      toast.success('Email added successfully!');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleCancel = () => {
    setFormData({ email: '', type: 'Work', preferred: false });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Email Address" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <Select
            label="Email Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={emailTypeOptions}
            required
          />
          <Select
            label="Preferred Email"
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
            Add Email
          </Button>
        </div>
      </form>
    </Modal>
  );
}
