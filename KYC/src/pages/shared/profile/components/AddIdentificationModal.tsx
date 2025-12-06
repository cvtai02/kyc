import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { appFetch } from '@/base/appFetch';
import { API_BASE_URL } from '@/base/constants';
import { useAuthStore } from '@/hooks/useAuthStore';
import Modal from '@/components/modal';
import Button from '@/components/button';

interface AddIdentificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (identification: { passport?: File; nationalId?: File; driverLicense?: File }) => void;
}

export default function AddIdentificationModal({
  isOpen,
  onClose,
  onAdd,
}: AddIdentificationModalProps) {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState<{
    passport?: File;
    nationalId?: File;
    driverLicense?: File;
  }>({});

  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setError('');
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { passport?: File; nationalId?: File; driverLicense?: File }) => {
      return appFetch(`${API_BASE_URL}/users/${user?.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      onAdd(formData);
      if (user) {
        setUser({ ...user });
      }
      setFormData({});
      setError('');
      toast.success('Identification document added successfully!');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least one file is uploaded
    if (!formData.passport && !formData.nationalId && !formData.driverLicense) {
      setError('At least one identification document is required (Passport, National ID, or Driver License)');
      return;
    }
    
    mutate(formData);
  };

  const handleCancel = () => {
    setFormData({});
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Identification Document" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
              {error}
            </div>
          )}
          <p className="text-sm text-gray-600 mb-4">
            Please upload at least one identification document.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passport
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'passport')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.passport && (
              <p className="mt-1 text-sm text-green-600">✓ {formData.passport.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              National ID Card
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'nationalId')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.nationalId && (
              <p className="mt-1 text-sm text-green-600">✓ {formData.nationalId.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver's License
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'driverLicense')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.driverLicense && (
              <p className="mt-1 text-sm text-green-600">✓ {formData.driverLicense.name}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isPending}>
            Add Document
          </Button>
        </div>
      </form>
    </Modal>
  );
}
