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

interface EditEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: { email: string; type: string; preferred: boolean };
  onSave: (email: { email: string; type: string; preferred: boolean }) => void;
}

const emailTypeOptions = [
  { value: 'Work', label: 'Work' },
  { value: 'Personal', label: 'Personal' },
];

const preferredOptions = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
];

export default function EditEmailModal({
  isOpen,
  onClose,
  email,
  onSave,
}: EditEmailModalProps) {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    email: email.email,
    type: email.type,
    preferred: email.preferred,
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
      onSave(formData);
      if (user) {
        setUser({ ...user, email: formData.email });
      }
      toast.success('Email updated successfully!');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleCancel = () => {
    setFormData({ 
      email: email.email, 
      type: email.type, 
      preferred: email.preferred 
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Email Address" size="xxl">
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
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
