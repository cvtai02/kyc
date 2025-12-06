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

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: {
    type: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  onSave: (address: {
    type: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }) => void;
}

const addressTypeOptions = [
  { value: 'Mailing', label: 'Mailing' },
  { value: 'Work', label: 'Work' },
];

export default function EditAddressModal({
  isOpen,
  onClose,
  address,
  onSave,
}: EditAddressModalProps) {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    type: address.type,
    street: address.street,
    city: address.city,
    postalCode: address.postalCode,
    country: address.country,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      type: string;
      street: string;
      city: string;
      postalCode: string;
      country: string;
    }) => {
      return appFetch(`${API_BASE_URL}/users/${user?.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      onSave(formData);
      if (user) {
        setUser({ ...user, address: { ...user.address, ...formData } });
      }
      toast.success('Address updated successfully!');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      type: address.type,
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Address" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Input
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <div className="col-span-2">
            <Input
              label="Street Address"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <Select
            label="Address Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={addressTypeOptions}
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
