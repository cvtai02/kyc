import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import Button from '../../../components/button';
import Card from '@/components/card';
import Title from '@/components/title';
import InfoField from '@/components/infoField';
import { FiEdit, FiPlus } from 'react-icons/fi';
import type { User } from '../../../types/user';
import {
  // TODO: lazy load these modals
  EditBasicInfoModal,
  EditEmailModal,
  EditPhoneModal,
  EditAddressModal,
  EditIdentificationModal,
  EditEmploymentModal,
  AddEmailModal,
  AddPhoneModal,
  AddAddressModal,
  AddIdentificationModal,
  AddOccupationModal,
} from './components';

// Component Interfaces
interface BasicInformationCardProps {
  data: User;
  isReadOnly: boolean;
  onEdit?: () => void;
}

interface EmailsCardProps {
  emails: Array<{ email: string; type: string; preferred: boolean }>;
  isReadOnly: boolean;
  onEdit?: (index: number) => void;
  onAdd?: () => void;
}

interface PhonesCardProps {
  phones: Array<{ number: string; type: string; preferred: boolean }>;
  isReadOnly: boolean;
  onEdit?: (index: number) => void;
  onAdd?: () => void;
}

interface AddressesCardProps {
  addresses: Array<{
    type: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }>;
  isReadOnly: boolean;
  onEdit?: (index: number) => void;
  onAdd?: () => void;
}

interface IdentificationDocumentsCardProps {
  documents: { passport?: string; nationalId?: string; driverLicense?: string };
  isReadOnly: boolean;
  onEdit?: () => void;
  onAdd?: () => void;
}

interface EmploymentCardProps {
  occupations: Array<{
    occupation: string;
    fromDate: string;
    toDate?: string;
  }>;
  isReadOnly: boolean;
  onEdit?: (index: number) => void;
  onAdd?: () => void;
}

// Card Components
function BasicInformationCard({ data, isReadOnly, onEdit }: BasicInformationCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Basic Information" />
        {!isReadOnly && onEdit && (
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit basic information"
          >
            <FiEdit size={20} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField label="First Name" value={data.firstName} />
        <InfoField label="Middle Name" value={data.maidenName} />
        <InfoField label="Last Name" value={data.lastName} />
        <InfoField label="Date of Birth" value={data.birthDate} />
        <InfoField label="Age" value={data.age} />
        <InfoField label="Gender" value={data.gender} />
      </div>
    </Card>
  );
}

function EmailsCard({ emails, isReadOnly, onEdit, onAdd }: EmailsCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Email Addresses" />
        {!isReadOnly && onAdd && (
          <button
            onClick={onAdd}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            aria-label="Add email"
          >
            <FiPlus size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {emails.map((emailObj, index) => (
          <div key={index}>
            {index > 0 && <div className="border-t border-gray-200 my-4" />}
            <div className="flex justify-between items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField label="Email" value={emailObj.email} />
                <InfoField label="Type" value={emailObj.type} />
                <InfoField label="Preferred" value={emailObj.preferred ? 'Yes' : 'No'} />
              </div>
              {!isReadOnly && onEdit && (
                <button
                  onClick={() => onEdit(index)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Edit email"
                >
                  <FiEdit size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PhonesCard({ phones, isReadOnly, onEdit, onAdd }: PhonesCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Phone Numbers" />
        {!isReadOnly && onAdd && (
          <button
            onClick={onAdd}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            aria-label="Add phone"
          >
            <FiPlus size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {phones.map((phone, index) => (
          <div key={index}>
            {index > 0 && <div className="border-t border-gray-200 my-4" />}
            <div className="flex justify-between items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField label="Phone Number" value={phone.number} />
                <InfoField label="Type" value={phone.type} />
                <InfoField label="Preferred" value={phone.preferred ? 'Yes' : 'No'} />
              </div>
              {!isReadOnly && onEdit && (
                <button
                  onClick={() => onEdit(index)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors ml-2"
                  aria-label="Edit phone"
                >
                  <FiEdit size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AddressesCard({ addresses, isReadOnly, onEdit, onAdd }: AddressesCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Addresses" />
        {!isReadOnly && onAdd && (
          <button
            onClick={onAdd}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            aria-label="Add address"
          >
            <FiPlus size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {addresses.map((address, index) => (
          <div key={index}>
            {index > 0 && <div className="border-t border-gray-200 my-4" />}
            <div className="flex justify-between items-start">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <InfoField label="Type" value={address.type} />
                </div>
                <InfoField label="Country" value={address.country} />
                <InfoField label="City" value={address.city} />
                <InfoField label="Street Address" value={address.street} />
                <InfoField label="Postal Code" value={address.postalCode} />
              </div>
              {!isReadOnly && onEdit && (
                <button
                  onClick={() => onEdit(index)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors ml-2"
                  aria-label="Edit address"
                >
                  <FiEdit size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function IdentificationDocumentsCard({ documents, isReadOnly, onEdit, onAdd }: IdentificationDocumentsCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Identification Documents" />
        {!isReadOnly && (
          <div className="flex gap-2">
            {onAdd && (
              <button
                onClick={onAdd}
                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                aria-label="Add identification document"
              >
                <FiPlus size={20} />
              </button>
            )}
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Edit identification documents"
              >
                <FiEdit size={20} />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField label="Passport" value={documents.passport ? '✓ Uploaded' : 'Not uploaded'} />
        <InfoField label="National ID Card" value={documents.nationalId ? '✓ Uploaded' : 'Not uploaded'} />
        <InfoField label="Driver's License" value={documents.driverLicense ? '✓ Uploaded' : 'Not uploaded'} />
      </div>
    </Card>
  );
}

function EmploymentCard({ occupations, isReadOnly, onEdit, onAdd }: EmploymentCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Occupation and Employment Information" />
        {!isReadOnly && onAdd && (
          <button
            onClick={onAdd}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            aria-label="Add occupation"
          >
            <FiPlus size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {occupations.length === 0 ? (
          <p className="text-gray-500 text-sm">No employment information added</p>
        ) : (
          occupations.map((occupation, index) => (
            <div key={index}>
              {index > 0 && <div className="border-t border-gray-200 my-4" />}
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoField label="Occupation" value={occupation.occupation} />
                  <InfoField label="From Date" value={occupation.fromDate} />
                  {occupation.toDate && <InfoField label="To Date" value={occupation.toDate} />}
                </div>
                {!isReadOnly && onEdit && (
                  <button
                    onClick={() => onEdit(index)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors ml-2"
                    aria-label="Edit occupation"
                  >
                    <FiEdit size={18} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const { user } = useAuthStore();
  const isUser = user?.role === 'user';

  // State for fetched user data
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Determine which user data to use
  const displayUser = fetchedUser || user;

  // Modal states for editing
  const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isIdentificationModalOpen, setIsIdentificationModalOpen] = useState(false);
  const [isEmploymentModalOpen, setIsEmploymentModalOpen] = useState(false);

  // Modal states for adding
  const [isAddEmailModalOpen, setIsAddEmailModalOpen] = useState(false);
  const [isAddPhoneModalOpen, setIsAddPhoneModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isAddIdentificationModalOpen, setIsAddIdentificationModalOpen] = useState(false);
  const [isAddOccupationModalOpen, setIsAddOccupationModalOpen] = useState(false);

  // Selected item index for editing
  const [selectedEmailIndex, setSelectedEmailIndex] = useState<number>(0);
  const [selectedPhoneIndex, setSelectedPhoneIndex] = useState<number>(0);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);
  const [selectedOccupationIndex, setSelectedOccupationIndex] = useState<number>(0);

  // Fetch user from DummyJSON API when id parameter is present
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
          const response = await fetch(`https://dummyjson.com/users/${userId}`);
          if (!response.ok) {
            throw new Error('User not found');
          }
          const data = await response.json();
          
          // Transform DummyJSON user data to match our User type
          const transformedUser: User = {
            accessToken: '',
            refreshToken: '',
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            maidenName: data.maidenName || '',
            age: data.age,
            gender: data.gender,
            email: data.email,
            phone: data.phone,
            username: data.username,
            password: '', // Not provided by API
            birthDate: data.birthDate,
            image: data.image,
            bloodGroup: data.bloodGroup,
            height: data.height,
            weight: data.weight,
            eyeColor: data.eyeColor,
            hair: data.hair,
            ip: data.ip,
            address: data.address,
            macAddress: data.macAddress,
            university: data.university,
            bank: data.bank,
            company: data.company,
            ein: data.ein,
            ssn: data.ssn,
            userAgent: data.userAgent,
            crypto: data.crypto,
            role: data.role || 'user',
          };
          
          setFetchedUser(transformedUser);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          setFetchError(error instanceof Error ? error.message : 'Failed to fetch user');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchUser();
    }
  }, [userId]);

  // Mock data (in real app, this would come from user state management)
  const [emails, setEmails] = useState<Array<{ email: string; type: string; preferred: boolean }>>([
    { email: displayUser?.email || '', type: 'Work', preferred: true }
  ]);
  const [phones, setPhones] = useState<Array<{ number: string; type: string; preferred: boolean }>>([
    { number: displayUser?.phone || '', type: 'Work', preferred: true }
  ]);
  const [addresses, setAddresses] = useState<Array<{
    type: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }>>([
    {
      type: 'Mailing',
      street: displayUser?.address.address || '',
      city: displayUser?.address.city || '',
      postalCode: displayUser?.address.postalCode || '',
      country: displayUser?.address.country || '',
    }
  ]);
  const [identificationDocuments, setIdentificationDocuments] = useState<{
    passport?: string;
    nationalId?: string;
    driverLicense?: string;
  }>({
    passport: displayUser?.ssn ? 'mock-passport.pdf' : undefined,
    nationalId: displayUser?.ein ? 'mock-national-id.pdf' : undefined,
  });
  const [occupations, setOccupations] = useState<Array<{
    occupation: string;
    fromDate: string;
    toDate?: string;
  }>>([]);

  // Edit handlers
  const handleEditBasicInfo = () => {
    setIsBasicInfoModalOpen(true);
  };

  const handleEditEmail = (index: number) => {
    setSelectedEmailIndex(index);
    setIsEmailModalOpen(true);
  };

  const handleEditPhone = (index: number) => {
    setSelectedPhoneIndex(index);
    setIsPhoneModalOpen(true);
  };

  const handleEditAddress = (index: number) => {
    setSelectedAddressIndex(index);
    setIsAddressModalOpen(true);
  };

  const handleEditIdentification = () => {
    setIsIdentificationModalOpen(true);
  };

  const handleEditOccupation = (index: number) => {
    setSelectedOccupationIndex(index);
    setIsEmploymentModalOpen(true);
  };

  // Add handlers
  const handleAddEmail = () => {
    setIsAddEmailModalOpen(true);
  };

  const handleAddPhone = () => {
    setIsAddPhoneModalOpen(true);
  };

  const handleAddAddress = () => {
    setIsAddAddressModalOpen(true);
  };

  const handleAddIdentification = () => {
    setIsAddIdentificationModalOpen(true);
  };

  const handleAddOccupation = () => {
    setIsAddOccupationModalOpen(true);
  };

  // Save handlers for editing
  const handleSaveBasicInfo = (data: Partial<User>) => {
    // TODO: Implement API call to save basic information
    console.log('Saving basic information:', data);
  };

  const handleSaveEmail = (email: { email: string; type: string; preferred: boolean }) => {
    const updatedEmails = [...emails];
    updatedEmails[selectedEmailIndex] = email;
    setEmails(updatedEmails);
    console.log('Saving email:', email);
  };

  const handleSavePhone = (phone: { number: string; type: string; preferred: boolean }) => {
    const updatedPhones = [...phones];
    updatedPhones[selectedPhoneIndex] = phone;
    setPhones(updatedPhones);
    console.log('Saving phone:', phone);
  };

  const handleSaveAddress = (address: { type: string; street: string; city: string; postalCode: string; country: string }) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[selectedAddressIndex] = address;
    setAddresses(updatedAddresses);
    console.log('Saving address:', address);
  };

  const handleSaveIdentification = (documents: { passport?: File; nationalId?: File; driverLicense?: File }) => {
    // TODO: Implement API call to save identification documents
    // For now, update with mock file names
    const updatedDocs = { ...identificationDocuments };
    if (documents.passport) updatedDocs.passport = documents.passport.name;
    if (documents.nationalId) updatedDocs.nationalId = documents.nationalId.name;
    if (documents.driverLicense) updatedDocs.driverLicense = documents.driverLicense.name;
    setIdentificationDocuments(updatedDocs);
    console.log('Saving identification:', documents);
  };

  const handleSaveOccupation = (occupation: { occupation: string; fromDate: string; toDate?: string }) => {
    const updatedOccupations = [...occupations];
    updatedOccupations[selectedOccupationIndex] = occupation;
    setOccupations(updatedOccupations);
    console.log('Saving occupation:', occupation);
  };

  // Save handlers for adding
  const handleAddNewEmail = (email: { email: string; type: string; preferred: boolean }) => {
    // TODO: Implement API call to add email
    setEmails([...emails, email]);
    console.log('Adding email:', email);
  };

  const handleAddNewPhone = (phone: { number: string; type: string; preferred: boolean }) => {
    // TODO: Implement API call to add phone
    setPhones([...phones, phone]);
    console.log('Adding phone:', phone);
  };

  const handleAddNewAddress = (address: {
    type: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  }) => {
    // TODO: Implement API call to add address
    setAddresses([...addresses, address]);
    console.log('Adding address:', address);
  };

  const handleAddNewIdentification = (identification: { passport?: File; nationalId?: File; driverLicense?: File }) => {
    // TODO: Implement API call to add identification
    const updatedDocs = { ...identificationDocuments };
    if (identification.passport) updatedDocs.passport = identification.passport.name;
    if (identification.nationalId) updatedDocs.nationalId = identification.nationalId.name;
    if (identification.driverLicense) updatedDocs.driverLicense = identification.driverLicense.name;
    setIdentificationDocuments(updatedDocs);
    console.log('Adding identification:', identification);
  };

  const handleAddNewOccupation = (occupation: {
    occupation: string;
    fromDate: string;
    toDate?: string;
  }) => {
    // TODO: Implement API call to add occupation
    setOccupations([...occupations, occupation]);
    console.log('Adding occupation:', occupation);
  };

  const handleNavigateToKYC = () => {
    navigate('/kyc');
  };

  const isReadOnly = !isUser || !!userId;

  if (isLoading) {
    return <div className="container mx-auto p-6 max-w-6xl">Loading user data...</div>;
  }

  if (fetchError) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {fetchError}
        </div>
      </div>
    );
  }

  if (!displayUser) {
    return <div className="container mx-auto p-6 max-w-6xl">Loading...</div>;
  }

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center">
        <Title text="User Profile" variant='large'/>
        {isUser && (
          <div className="flex gap-3">
            <Button onClick={handleNavigateToKYC}>
              KYC
            </Button>
          </div>
        )}
      </div>

      <div className="gap-4 flex flex-col">
          <BasicInformationCard
            data={displayUser}
            isReadOnly={isReadOnly}
            onEdit={handleEditBasicInfo}
          />

          {/* Contact Information - Emails */}
          <EmailsCard
            emails={emails}
            isReadOnly={isReadOnly}
            onEdit={handleEditEmail}
            onAdd={handleAddEmail}
          />

          {/* Contact Information - Phones */}
          <PhonesCard
            phones={phones}
            isReadOnly={isReadOnly}
            onEdit={handleEditPhone}
            onAdd={handleAddPhone}
          />

          {/* Addresses */}
          <AddressesCard
            addresses={addresses}
            isReadOnly={isReadOnly}
            onEdit={handleEditAddress}
            onAdd={handleAddAddress}
          />

          {/* Identification Documents */}
          <IdentificationDocumentsCard
            documents={identificationDocuments}
            isReadOnly={isReadOnly}
            onEdit={handleEditIdentification}
            onAdd={handleAddIdentification}
          />

          {/* Employment Information */}
          <EmploymentCard
            occupations={occupations}
            isReadOnly={isReadOnly}
            onEdit={handleEditOccupation}
            onAdd={handleAddOccupation}
          />
      </div>

      {/* Edit Modals */}
      {displayUser && (
        <>
          <EditBasicInfoModal
            isOpen={isBasicInfoModalOpen}
            onClose={() => setIsBasicInfoModalOpen(false)}
            data={displayUser}
            onSave={handleSaveBasicInfo}
          />
          <EditEmailModal
            isOpen={isEmailModalOpen}
            onClose={() => setIsEmailModalOpen(false)}
            email={emails[selectedEmailIndex]}
            onSave={handleSaveEmail}
          />
          <EditPhoneModal
            isOpen={isPhoneModalOpen}
            onClose={() => setIsPhoneModalOpen(false)}
            phone={phones[selectedPhoneIndex] || { number: '', type: 'Work', preferred: false }}
            onSave={handleSavePhone}
          />
          <EditAddressModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            address={addresses[selectedAddressIndex] || { type: 'Mailing', street: '', city: '', postalCode: '', country: '' }}
            onSave={handleSaveAddress}
          />
          <EditIdentificationModal
            isOpen={isIdentificationModalOpen}
            onClose={() => setIsIdentificationModalOpen(false)}
            documents={identificationDocuments}
            onSave={handleSaveIdentification}
          />
          <EditEmploymentModal
            isOpen={isEmploymentModalOpen}
            onClose={() => setIsEmploymentModalOpen(false)}
            occupation={occupations[selectedOccupationIndex] || { occupation: 'Unemployed', fromDate: '' }}
            onSave={handleSaveOccupation}
          />

          {/* Add Modals */}
          <AddEmailModal
            isOpen={isAddEmailModalOpen}
            onClose={() => setIsAddEmailModalOpen(false)}
            onAdd={handleAddNewEmail}
          />
          <AddPhoneModal
            isOpen={isAddPhoneModalOpen}
            onClose={() => setIsAddPhoneModalOpen(false)}
            onAdd={handleAddNewPhone}
          />
          <AddAddressModal
            isOpen={isAddAddressModalOpen}
            onClose={() => setIsAddAddressModalOpen(false)}
            onAdd={handleAddNewAddress}
          />
          <AddIdentificationModal
            isOpen={isAddIdentificationModalOpen}
            onClose={() => setIsAddIdentificationModalOpen(false)}
            onAdd={handleAddNewIdentification}
          />
          <AddOccupationModal
            isOpen={isAddOccupationModalOpen}
            onClose={() => setIsAddOccupationModalOpen(false)}
            onAdd={handleAddNewOccupation}
          />
        </>
      )}
    </div>
  );
}
