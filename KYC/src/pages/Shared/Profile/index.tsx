import { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import Button from '../../../components/button';
import type { User } from './types';
import Loader from '@/components/loader/input';
import { appLazy } from '@/pages/shared/systems/appLazy';

// Lazy load card components
const BasicInformationCard = appLazy(() => import('./components/BasicInformationCard'));
const EmailsCard = appLazy(() => import('./components/EmailsCard'));
const PhonesCard = appLazy(() => import('./components/PhonesCard'));
const AddressesCard = appLazy(() => import('./components/AddressesCard'));
const IdentificationDocumentsCard = appLazy(() => import('./components/IdentificationDocumentsCard'));
const EmploymentCard = appLazy(() => import('./components/EmploymentCard'));

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isUser = user?.role === 'user';
  const [isEditMode, setIsEditMode] = useState(false);

  const [profileData, setProfileData] = useState<User | null>(user);

  const handleBasicInfoChange = (field: string, value: string | number) => {
    if (!profileData) return;
    setProfileData((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const updateEmail = (value: string) => {
    if (!profileData) return;
    setProfileData((prev) => ({
      ...prev!,
      email: value,
    }));
  };

  const updatePhone = (value: string) => {
    if (!profileData) return;
    setProfileData((prev) => ({
      ...prev!,
      phone: value,
    }));
  };

  const updateAddress = (field: string, value: string | number) => {
    if (!profileData) return;
    setProfileData((prev) => ({
      ...prev!,
      address: {
        ...prev!.address,
        [field]: value,
      },
    }));
  };

  const updateEmployment = (field: string, value: string) => {
    if (!profileData) return;
    setProfileData((prev) => ({
      ...prev!,
      company: {
        ...prev!.company,
        [field]: value,
      },
    }));
  };

  const updateIdentification = (field: string, value: string) => {
    if (!profileData) return;
    setProfileData((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    // TODO: Implement save logic (API call)
    setIsEditMode(false);
    console.log('Saving profile data:', profileData);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // TODO: Reset to original data
  };

  const handleNavigateToKYC = () => {
    navigate('/kyc');
  };

  const isReadOnly = !isUser || !isEditMode;

  if (!profileData) {
    return <div className="container mx-auto p-6 max-w-6xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        {isUser && (
          <div className="flex gap-3">
            {isEditMode ? (
              <>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={handleEdit}>
                  Edit
                </Button>
                <Button onClick={handleNavigateToKYC}>
                  KYC
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="gap-4 flex flex-col">
        <Suspense fallback={<Loader />}>
          <BasicInformationCard
            data={profileData}
            isReadOnly={isReadOnly}
            onChange={handleBasicInfoChange}
          />

          {/* Contact Information - Emails */}
          <EmailsCard
            email={profileData.email}
            isReadOnly={isReadOnly}
            onUpdate={updateEmail}
          />

          {/* Contact Information - Phones */}
          <PhonesCard
            phone={profileData.phone}
            isReadOnly={isReadOnly}
            onUpdate={updatePhone}
          />

          {/* Addresses */}
          <AddressesCard
            address={profileData.address}
            isReadOnly={isReadOnly}
            onUpdate={updateAddress}
          />
          {/* Identification Documents */}
          <IdentificationDocumentsCard
            ssn={profileData.ssn}
            ein={profileData.ein}
            isReadOnly={isReadOnly}
            onUpdate={updateIdentification}
          />

          {/* Employment Information */}
          <EmploymentCard
            company={profileData.company}
            isReadOnly={isReadOnly}
            onUpdate={updateEmployment}
          />
        </Suspense>
      </div>
    </div>
  );
}
