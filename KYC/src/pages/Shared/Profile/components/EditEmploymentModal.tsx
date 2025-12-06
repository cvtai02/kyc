import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { appFetch } from '@/base/appFetch';
import { API_BASE_URL } from '@/base/constants';
import { useAuthStore } from '@/hooks/useAuthStore';
import Modal from '@/components/modal';
import Input from '@/components/input';
import Button from '@/components/button';
import Select from '@/components/select';

interface EditEmploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  occupation: {
    occupation: string;
    fromDate: string;
    toDate?: string;
  };
  onSave: (occupation: {
    occupation: string;
    fromDate: string;
    toDate?: string;
  }) => void;
}

const OCCUPATION_OPTIONS = [
  { value: 'Unemployed', label: 'Unemployed' },
  { value: 'Employed', label: 'Employed' },
  { value: 'Self-Employed', label: 'Self-Employed' },
  { value: 'Student', label: 'Student' },
  { value: 'Retired', label: 'Retired' },
];

export default function EditEmploymentModal({
  isOpen,
  onClose,
  occupation,
  onSave,
}: EditEmploymentModalProps) {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    occupation: occupation.occupation,
    fromDate: occupation.fromDate,
    toDate: occupation.toDate || '',
  });
  
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      occupation: string;
      fromDate: string;
      toDate?: string;
    }) => {
      return appFetch(`${API_BASE_URL}/users/${user?.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      onSave(formData);
      if (user) {
        setUser({ ...user });
      }
      toast.success('Occupation updated successfully!');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate To Date is after From Date if provided
    if (formData.toDate && formData.fromDate && formData.toDate <= formData.fromDate) {
      setError('To Date must be after From Date');
      return;
    }
    
    const submitData = {
      ...formData,
      toDate: formData.toDate || undefined,
    };
    
    mutate(submitData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Occupations" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
              {error}
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Select
                label="Occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                options={OCCUPATION_OPTIONS}
                required
              />
            </div>
            <div>
              <Input
                label="From Date"
                name="fromDate"
                type="date"
                value={formData.fromDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                label="To Date"
                name="toDate"
                type="date"
                value={formData.toDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isPending}>
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
