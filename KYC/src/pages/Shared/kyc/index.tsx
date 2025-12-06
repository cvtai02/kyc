import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import Card from '../../../components/card';
import Button from '../../../components/button';
import Input from '../../../components/input';
import Select from '../../../components/select';

interface Income {
  type: 'Salary' | 'Investment' | 'Others';
  amount: number;
  currency: string;
}

interface Asset {
  type: 'Bond' | 'Liquidity' | 'Real Estate' | 'Others';
  amount: number;
  currency: string;
}

interface Liability {
  type: 'Personal Loan' | 'Real Estate Loan' | 'Others';
  amount: number;
  currency: string;
}

interface SourceOfWealth {
  type: 'Inheritance' | 'Donation';
  amount: number;
  currency: string;
}

interface PersonalInformation {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
}

interface FinancialStatus {
  incomes: Income[];
  assets: Asset[];
  liabilities: Liability[];
  sourcesOfWealth: SourceOfWealth[];
  investmentExperience: '' | '<5' | '5-10' | '>10';
  riskTolerance: '' | '10' | '30' | '100';
}

interface KYCData {
  personalInformation: PersonalInformation;
  financialStatus: FinancialStatus;
}

export default function KYC() {
  const { user } = useAuthStore();
  const isOfficer = user?.role !== 'user';
  const [isEditMode, setIsEditMode] = useState(false);

  const [kycData, setKYCData] = useState<KYCData>({
    personalInformation: {
      firstName: user?.firstName || '',
      middleName: user?.maidenName || '',
      lastName: user?.lastName || '',
      dateOfBirth: user?.birthDate || '',
      age: user?.age || 0,
    },
    financialStatus: {
      incomes: [{ type: 'Salary', amount: 0, currency: 'USD' }],
      assets: [{ type: 'Bond', amount: 0, currency: 'USD' }],
      liabilities: [{ type: 'Personal Loan', amount: 0, currency: 'USD' }],
      sourcesOfWealth: [{ type: 'Inheritance', amount: 0, currency: 'USD' }],
      investmentExperience: '',
      riskTolerance: '',
    },
  });

  // Update personal information when user data changes
  useEffect(() => {
    if (user) {
      setKYCData(prev => ({
        ...prev,
        personalInformation: {
          firstName: user.firstName || '',
          middleName: user.maidenName || '',
          lastName: user.lastName || '',
          dateOfBirth: user.birthDate || '',
          age: user.age || 0,
        },
      }));
    }
  }, [user]);

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

  // Calculate net worth
  const calculateNetWorth = (): number => {
    const totalIncomes = kycData.financialStatus.incomes.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalAssets = kycData.financialStatus.assets.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalLiabilities = kycData.financialStatus.liabilities.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalSourcesOfWealth = kycData.financialStatus.sourcesOfWealth.reduce((sum, item) => sum + (item.amount || 0), 0);
    
    return totalIncomes + totalAssets + totalLiabilities + totalSourcesOfWealth;
  };

  const handlePersonalInfoChange = (field: keyof PersonalInformation, value: string | number) => {
    setKYCData(prev => ({
      ...prev,
      personalInformation: {
        ...prev.personalInformation,
        [field]: value,
      },
    }));

    // Update age when date of birth changes
    if (field === 'dateOfBirth' && typeof value === 'string') {
      const age = calculateAge(value);
      setKYCData(prev => ({
        ...prev,
        personalInformation: {
          ...prev.personalInformation,
          age,
        },
      }));
    }
  };

  const handleFinancialChange = (field: keyof FinancialStatus, value: any) => {
    setKYCData(prev => ({
      ...prev,
      financialStatus: {
        ...prev.financialStatus,
        [field]: value,
      },
    }));
  };

  // Income handlers
  const addIncome = () => {
    handleFinancialChange('incomes', [
      ...kycData.financialStatus.incomes,
      { type: 'Salary', amount: 0, currency: 'USD' },
    ]);
  };

  const updateIncome = (index: number, field: keyof Income, value: string | number) => {
    const newIncomes = [...kycData.financialStatus.incomes];
    newIncomes[index] = { ...newIncomes[index], [field]: value };
    handleFinancialChange('incomes', newIncomes);
  };

  const removeIncome = (index: number) => {
    handleFinancialChange('incomes', kycData.financialStatus.incomes.filter((_, i) => i !== index));
  };

  // Asset handlers
  const addAsset = () => {
    handleFinancialChange('assets', [
      ...kycData.financialStatus.assets,
      { type: 'Bond', amount: 0, currency: 'USD' },
    ]);
  };

  const updateAsset = (index: number, field: keyof Asset, value: string | number) => {
    const newAssets = [...kycData.financialStatus.assets];
    newAssets[index] = { ...newAssets[index], [field]: value };
    handleFinancialChange('assets', newAssets);
  };

  const removeAsset = (index: number) => {
    handleFinancialChange('assets', kycData.financialStatus.assets.filter((_, i) => i !== index));
  };

  // Liability handlers
  const addLiability = () => {
    handleFinancialChange('liabilities', [
      ...kycData.financialStatus.liabilities,
      { type: 'Personal Loan', amount: 0, currency: 'USD' },
    ]);
  };

  const updateLiability = (index: number, field: keyof Liability, value: string | number) => {
    const newLiabilities = [...kycData.financialStatus.liabilities];
    newLiabilities[index] = { ...newLiabilities[index], [field]: value };
    handleFinancialChange('liabilities', newLiabilities);
  };

  const removeLiability = (index: number) => {
    handleFinancialChange('liabilities', kycData.financialStatus.liabilities.filter((_, i) => i !== index));
  };

  // Source of Wealth handlers
  const addSourceOfWealth = () => {
    handleFinancialChange('sourcesOfWealth', [
      ...kycData.financialStatus.sourcesOfWealth,
      { type: 'Inheritance', amount: 0, currency: 'USD' },
    ]);
  };

  const updateSourceOfWealth = (index: number, field: keyof SourceOfWealth, value: string | number) => {
    const newSources = [...kycData.financialStatus.sourcesOfWealth];
    newSources[index] = { ...newSources[index], [field]: value };
    handleFinancialChange('sourcesOfWealth', newSources);
  };

  const removeSourceOfWealth = (index: number) => {
    handleFinancialChange('sourcesOfWealth', kycData.financialStatus.sourcesOfWealth.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving KYC data:', kycData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    // TODO: Reset to original data
    setIsEditMode(false);
  };

  const isReadOnly = isOfficer || !isEditMode;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">KYC Information</h1>
          {!isOfficer && (
            <div className="flex gap-2">
              {!isEditMode ? (
                <Button onClick={() => setIsEditMode(true)}>Edit</Button>
              ) : (
                <>
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Personal Information Section */}
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={kycData.personalInformation.firstName}
              onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
              disabled={isReadOnly}
            />
            <Input
              label="Middle Name"
              value={kycData.personalInformation.middleName}
              onChange={(e) => handlePersonalInfoChange('middleName', e.target.value)}
              disabled={isReadOnly}
            />
            <Input
              label="Last Name"
              value={kycData.personalInformation.lastName}
              onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
              disabled={isReadOnly}
            />
            <Input
              label="Date of Birth (DD/MM/YYYY)"
              value={kycData.personalInformation.dateOfBirth}
              onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
              placeholder="DD/MM/YYYY"
              disabled={isReadOnly}
            />
            <Input
              label="Age"
              value={kycData.personalInformation.age}
              disabled
            />
          </div>
        </Card>

        {/* Financial Status Section */}
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Financial Status</h2>

          {/* Incomes */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Incomes (A)</h3>
              {!isReadOnly && (
                <Button variant="secondary" onClick={addIncome}>+ Add Income</Button>
              )}
            </div>
            <div className="space-y-4">
              {kycData.financialStatus.incomes.map((income, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                      label="Type"
                      value={income.type}
                      onChange={(e) => updateIncome(index, 'type', e.target.value as Income['type'])}
                      options={[
                        { value: 'Salary', label: 'Salary' },
                        { value: 'Investment', label: 'Investment' },
                        { value: 'Others', label: 'Others' },
                      ]}
                      disabled={isReadOnly}
                    />
                    <Input
                      label="Amount"
                      type="number"
                      value={income.amount}
                      onChange={(e) => updateIncome(index, 'amount', parseFloat(e.target.value) || 0)}
                      disabled={isReadOnly}
                    />
                    <Input
                      label="Currency"
                      value={income.currency}
                      onChange={(e) => updateIncome(index, 'currency', e.target.value)}
                      disabled={isReadOnly}
                    />
                  </div>
                  {!isReadOnly && kycData.financialStatus.incomes.length > 1 && (
                    <Button
                      variant="secondary"
                      onClick={() => removeIncome(index)}
                      className="mt-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Assets */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Assets (B)</h3>
              {!isReadOnly && (
                <Button variant="secondary" onClick={addAsset}>+ Add Asset</Button>
              )}
            </div>
            <div className="space-y-4">
              {kycData.financialStatus.assets.map((asset, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                      label="Type"
                      value={asset.type}
                      onChange={(e) => updateAsset(index, 'type', e.target.value as Asset['type'])}
                      options={[
                        { value: 'Bond', label: 'Bond' },
                        { value: 'Liquidity', label: 'Liquidity' },
                        { value: 'Real Estate', label: 'Real Estate' },
                        { value: 'Others', label: 'Others' },
                      ]}
                      disabled={isReadOnly}
                    />
                    <Input
                      label="Amount"
                      type="number"
                      value={asset.amount}
                      onChange={(e) => updateAsset(index, 'amount', parseFloat(e.target.value) || 0)}
                      disabled={isReadOnly}
                    />
                    <Input
                      label="Currency"
                      value={asset.currency}
                      onChange={(e) => updateAsset(index, 'currency', e.target.value)}
                      disabled={isReadOnly}
                    />
                  </div>
                  {!isReadOnly && kycData.financialStatus.assets.length > 1 && (
                    <Button
                      variant="secondary"
                      onClick={() => removeAsset(index)}
                      className="mt-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Liabilities (C)</h3>
              {!isReadOnly && (
                <Button variant="secondary" onClick={addLiability}>+ Add Liability</Button>
              )}
            </div>
            <div className="space-y-4">
              {kycData.financialStatus.liabilities.map((liability, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                      label="Type"
                      value={liability.type}
                      onChange={(e) => updateLiability(index, 'type', e.target.value as Liability['type'])}
                      options={[
                        { value: 'Personal Loan', label: 'Personal Loan' },
                        { value: 'Real Estate Loan', label: 'Real Estate Loan' },
                        { value: 'Others', label: 'Others' },
                      ]}
                      disabled={isReadOnly}
                    />
                    <Input
                      label="Amount"
                      type="number"
                      value={liability.amount}
                      onChange={(e) => updateLiability(index, 'amount', parseFloat(e.target.value) || 0)}
                      disabled={isReadOnly}
                    />
                    <Input
                      label="Currency"
                      value={liability.currency}
                      onChange={(e) => updateLiability(index, 'currency', e.target.value)}
                      disabled={isReadOnly}
                    />
                  </div>
                  {!isReadOnly && kycData.financialStatus.liabilities.length > 1 && (
                    <Button
                      variant="secondary"
                      onClick={() => removeLiability(index)}
                      className="mt-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Source of Wealth */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Source of Wealth (D)</h3>
              {!isReadOnly && (
                <Button variant="secondary" onClick={addSourceOfWealth}>+ Add Source</Button>
              )}
            </div>
            <div className="space-y-4">
              {kycData.financialStatus.sourcesOfWealth.map((source, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                      label="Type"
                      value={source.type}
                      onChange={(e) => updateSourceOfWealth(index, 'type', e.target.value as SourceOfWealth['type'])}
                      options={[
                        { value: 'Inheritance', label: 'Inheritance' },
                        { value: 'Donation', label: 'Donation' },
                      ]}
                      disabled={isReadOnly}
                    />
                    <Input
                      label="Amount"
                      type="number"
                      value={source.amount}
                      onChange={(e) => updateSourceOfWealth(index, 'amount', parseFloat(e.target.value) || 0)}
                      disabled={isReadOnly}
                    />
                    <Input
                      label="Currency"
                      value={source.currency}
                      onChange={(e) => updateSourceOfWealth(index, 'currency', e.target.value)}
                      disabled={isReadOnly}
                    />
                  </div>
                  {!isReadOnly && kycData.financialStatus.sourcesOfWealth.length > 1 && (
                    <Button
                      variant="secondary"
                      onClick={() => removeSourceOfWealth(index)}
                      className="mt-2 text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Net Worth */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-medium mb-2">Client Net Worth</h3>
            <p className="text-2xl font-bold text-blue-600">
              ${calculateNetWorth().toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              (A) + (B) + (C) + (D)
            </p>
          </div>

          {/* Investment Experience and Objectives */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Investment Experience and Objectives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Experience in Financial Markets"
                value={kycData.financialStatus.investmentExperience}
                onChange={(e) => handleFinancialChange('investmentExperience', e.target.value)}
                options={[
                  { value: '<5', label: '< 5 years' },
                  { value: '5-10', label: '> 5 and < 10 years' },
                  { value: '>10', label: '> 10 years' },
                ]}
                disabled={isReadOnly}
              />
              <Select
                label="Risk Tolerance"
                value={kycData.financialStatus.riskTolerance}
                onChange={(e) => handleFinancialChange('riskTolerance', e.target.value)}
                options={[
                  { value: '10', label: '10%' },
                  { value: '30', label: '30%' },
                  { value: '100', label: 'All-in' },
                ]}
                disabled={isReadOnly}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
