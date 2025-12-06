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
import type { User } from '@/types/user';

interface EditBasicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: User;
  onSave: (data: Partial<User>) => void;
}

export default function EditBasicInfoModal({
  isOpen,
  onClose,
  data,
  onSave,
}: EditBasicInfoModalProps) {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    maidenName: data.maidenName,
    birthDate: data.birthDate,
    age: data.age || 0,
  });

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Partial<User>) => {
      return appFetch(`${API_BASE_URL}/users/${user?.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      const age = calculateAge(formData.birthDate);
      const updatedData = { ...formData, age };
      onSave(updatedData);
      if (user) {
        setUser({ ...user, ...updatedData });
      }
      toast.success('Basic information updated successfully!');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const age = calculateAge(formData.birthDate);
    mutate({ ...formData, age });
  };

  const handleCancel = () => {
    setFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      maidenName: data.maidenName,
      birthDate: data.birthDate,
      age: data.age || 0,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Basic Information" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            label="Middle Name"
            name="maidenName"
            value={formData.maidenName}
            onChange={handleChange}
          />
          <Input
            label="Date of Birth"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            required
            placeholder="DD/MM/YYYY"
          />
          <Input
            label="Age"
            name="age"
            type="number"
            value={formData.age.toString()}
            onChange={handleChange}
            required
            min="0"
            max="150"
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
        