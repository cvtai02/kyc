import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import Card from '../../../components/card';
import Button from '../../../components/button';
import type { ProfileData, Email, Phone, Address, Employment } from './types';
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
  const isOfficer = user?.role === 'officer';
  const [isEditMode, setIsEditMode] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    basicInformation: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      age: 0,
    },
    emails: [{ email: '', type: 'Personal', preferred: true }],
    phones: [{ number: '', type: 'Personal', preferred: true }],
    addresses: [{ country: '', city: '', street: '', postalCode: '', type: 'Mailing' }],
    identificationDocuments: {},
    employments: [],
  });

  // Calculate age from date of birth
  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const [day, month, year] = dob.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Update age when date of birth changes
  useEffect(() => {
    const age = calculateAge(profileData.basicInformation.dateOfBirth);
    setProfileData((prev) => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        age,
      },
    }));
  }, [profileData.basicInformation.dateOfBirth]);

  const handleBasicInfoChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        [field]: value,
      },
    }));
  };

  // Email handlers
  const addEmail = () => {
    setProfileData((prev) => ({
      ...prev,
      emails: [...prev.emails, { email: '', type: 'Personal', preferred: false }],
    }));
  };

  const removeEmail = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== index),
    }));
  };

  const updateEmail = (index: number, field: keyof Email, value: string | boolean) => {
    setProfileData((prev) => ({
      ...prev,
      emails: prev.emails.map((email, i) =>
        i === index ? { ...email, [field]: value } : email
      ),
    }));
  };

  // Phone handlers
  const addPhone = () => {
    setProfileData((prev) => ({
      ...prev,
      phones: [...prev.phones, { number: '', type: 'Personal', preferred: false }],
    }));
  };

  const removePhone = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      phones: prev.phones.filter((_, i) => i !== index),
    }));
  };

  const updatePhone = (index: number, field: keyof Phone, value: string | boolean) => {
    setProfileData((prev) => ({
      ...prev,
      phones: prev.phones.map((phone, i) =>
        i === index ? { ...phone, [field]: value } : phone
      ),
    }));
  };

  // Address handlers
  const addAddress = () => {
    setProfileData((prev) => ({
      ...prev,
      addresses: [...prev.addresses, { country: '', city: '', street: '', postalCode: '', type: 'Mailing' }],
    }));
  };

  const removeAddress = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index),
    }));
  };

  const updateAddress = (index: number, field: keyof Address, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((address, i) =>
        i === index ? { ...address, [field]: value } : address
      ),
    }));
  };

  // Employment handlers
  const addEmployment = () => {
    setProfileData((prev) => ({
      ...prev,
      employments: [...prev.employments, { name: '', fromYear: new Date().getFullYear(), toYear: undefined }],
    }));
  };

  const removeEmployment = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      employments: prev.employments.filter((_, i) => i !== index),
    }));
  };

  const updateEmployment = (index: number, field: keyof Employment, value: string | number) => {
    setProfileData((prev) => ({
      ...prev,
      employments: prev.employments.map((employment, i) =>
        i === index ? { ...employment, [field]: value } : employment
      ),
    }));
  };

  // File upload handlers
  const handleFileChange = (field: 'id' | 'driverLicense', file: File | null) => {
    setProfileData((prev) => ({
      ...prev,
      identificationDocuments: {
        ...prev.identificationDocuments,
        [field]: file || undefined,
      },
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

  const isReadOnly = isOfficer || !isEditMode;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        {!isOfficer && (
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
            data={profileData.basicInformation}
            isReadOnly={isReadOnly}
            onChange={handleBasicInfoChange}
          />

          {/* Contact Information - Emails */}
          <EmailsCard
            emails={profileData.emails}
            isReadOnly={isReadOnly}
            onAdd={addEmail}
            onRemove={removeEmail}
            onUpdate={updateEmail}
          />

          {/* Contact Information - Phones */}
          <PhonesCard
            phones={profileData.phones}
            isReadOnly={isReadOnly}
            onAdd={addPhone}
            onRemove={removePhone}
            onUpdate={updatePhone}
          />

          {/* Addresses */}
          <AddressesCard
            addresses={profileData.addresses}
            isReadOnly={isReadOnly}
            onAdd={addAddress}
            onRemove={removeAddress}
            onUpdate={updateAddress}
          />
          {/* Identification Documents */}
          <IdentificationDocumentsCard
            documents={profileData.identificationDocuments}
            isReadOnly={isReadOnly}
            onFileChange={handleFileChange}
          />

          {/* Employment Information */}
          <EmploymentCard
            employments={profileData.employments}
            isReadOnly={isReadOnly}
            onAdd={addEmployment}
            onRemove={removeEmployment}
            onUpdate={updateEmployment}
          />
        </Suspense>
      </div>
    </div>
  );
}
