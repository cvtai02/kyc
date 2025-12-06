import { useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useKYCStore } from './store';
import Card from '@/components/card';
import Title from '@/components/title';
import InfoField from '@/components/infoField';
import { FiEdit, FiPlus } from 'react-icons/fi';
import type { User } from '../../../types/user';
import type { Income, Asset, Liability, SourceOfWealth, InvestmentExperience } from './types';
import {
  // TODO: lazy load these modals
  AddIncomeModal,
  EditIncomeModal,
  AddAssetModal,
  EditAssetModal,
  AddLiabilityModal,
  EditLiabilityModal,
  AddSourceOfWealthModal,
  EditSourceOfWealthModal,
  EditInvestmentExperienceModal,
} from './components';
import Loader from '@/components/loader';

// Component Interfaces
interface PersonalInformationCardProps {
  data: User;
}

interface IncomesCardProps {
  incomes: Income[];
  isReadOnly: boolean;
  onEdit?: (index: number) => void;
  onAdd?: () => void;
}

interface AssetsCardProps {
  assets: Asset[];
  isReadOnly: boolean;
  onEdit?: (index: number) => void;
  onAdd?: () => void;
}

interface LiabilitiesCardProps {
  liabilities: Liability[];
  isReadOnly: boolean;
  onEdit?: (index: number) => void;
  onAdd?: () => void;
}

interface SourceOfWealthCardProps {
  sourceOfWealth: SourceOfWealth[];
  isReadOnly: boolean;
  onEdit?: (index: number) => void;
  onAdd?: () => void;
}

interface NetWorthCardProps {
  netWorth: number;
  currency: string;
}

interface InvestmentExperienceCardProps {
  investmentExperience: InvestmentExperience;
  isReadOnly: boolean;
  onEdit?: () => void;
}

// Card Components
function PersonalInformationCard({ data }: PersonalInformationCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Personal Information" />
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

function IncomesCard({ incomes, isReadOnly, onEdit, onAdd }: IncomesCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Incomes (A)" />
        {!isReadOnly && onAdd && (
          <button
            onClick={onAdd}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            aria-label="Add income"
          >
            <FiPlus size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {incomes.length === 0 ? (
          <p className="text-gray-500 text-sm">No income information added</p>
        ) : (
          incomes.map((income, index) => (
            <div key={index}>
              {index > 0 && <div className="border-t border-gray-200 my-4" />}
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Type" value={income.type} />
                  <InfoField label="Amount (USD)" value={income.amount.toLocaleString()} />
                </div>
                {!isReadOnly && onEdit && (
                  <button
                    onClick={() => onEdit(index)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors ml-2"
                    aria-label="Edit income"
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

function AssetsCard({ assets, isReadOnly, onEdit, onAdd }: AssetsCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Assets (B)" />
        {!isReadOnly && onAdd && (
          <button
            onClick={onAdd}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            aria-label="Add asset"
          >
            <FiPlus size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {assets.length === 0 ? (
          <p className="text-gray-500 text-sm">No asset information added</p>
        ) : (
          assets.map((asset, index) => (
            <div key={index}>
              {index > 0 && <div className="border-t border-gray-200 my-4" />}
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Type" value={asset.type} />
                  <InfoField label="Amount (USD)" value={asset.amount.toLocaleString()} />
                </div>
                {!isReadOnly && onEdit && (
                  <button
                    onClick={() => onEdit(index)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors ml-2"
                    aria-label="Edit asset"
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

function LiabilitiesCard({ liabilities, isReadOnly, onEdit, onAdd }: LiabilitiesCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Liabilities (C)" />
        {!isReadOnly && onAdd && (
          <button
            onClick={onAdd}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            aria-label="Add liability"
          >
            <FiPlus size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {liabilities.length === 0 ? (
          <p className="text-gray-500 text-sm">No liability information added</p>
        ) : (
          liabilities.map((liability, index) => (
            <div key={index}>
              {index > 0 && <div className="border-t border-gray-200 my-4" />}
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Type" value={liability.type} />
                  <InfoField label="Amount (USD)" value={liability.amount.toLocaleString()} />
                </div>
                {!isReadOnly && onEdit && (
                  <button
                    onClick={() => onEdit(index)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors ml-2"
                    aria-label="Edit liability"
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

function SourceOfWealthCard({ sourceOfWealth, isReadOnly, onEdit, onAdd }: SourceOfWealthCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Source of Wealth (D)" />
        {!isReadOnly && onAdd && (
          <button
            onClick={onAdd}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
            aria-label="Add source of wealth"
          >
            <FiPlus size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {sourceOfWealth.length === 0 ? (
          <p className="text-gray-500 text-sm">No source of wealth information added</p>
        ) : (
          sourceOfWealth.map((source, index) => (
            <div key={index}>
              {index > 0 && <div className="border-t border-gray-200 my-4" />}
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoField label="Type" value={source.type} />
                  <InfoField label="Amount (USD)" value={source.amount.toLocaleString()} />
                </div>
                {!isReadOnly && onEdit && (
                  <button
                    onClick={() => onEdit(index)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors ml-2"
                    aria-label="Edit source of wealth"
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

function NetWorthCard({ netWorth, currency }: NetWorthCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Net Worth" />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-3xl font-bold text-blue-600">
            {netWorth.toLocaleString()} {currency}
          </p>
        </div>
      </div>
    </Card>
  );
}

function InvestmentExperienceCard({ investmentExperience, isReadOnly, onEdit }: InvestmentExperienceCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title text="Investment Experience and Objectives" />
        {!isReadOnly && onEdit && (
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit investment experience"
          >
            <FiEdit size={20} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField label="Experience in Financial Markets" value={investmentExperience.experienceInFinancialMarkets} />
        <InfoField label="Risk Tolerance" value={investmentExperience.riskTolerance} />
      </div>
    </Card>
  );
}

export default function KYC() {
  const { user } = useAuthStore();
  const {
    incomes,
    assets,
    liabilities,
    sourceOfWealth,
    investmentExperience,
    addIncome,
    updateIncome,
    addAsset,
    updateAsset,
    addLiability,
    updateLiability,
    addSourceOfWealth,
    updateSourceOfWealth,
    updateInvestmentExperience,
    getNetWorth,
  } = useKYCStore();

  const isUser = user?.role === 'user';

  // Modal states for adding
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [isAddLiabilityModalOpen, setIsAddLiabilityModalOpen] = useState(false);
  const [isAddSourceOfWealthModalOpen, setIsAddSourceOfWealthModalOpen] = useState(false);

  // Modal states for editing
  const [isEditIncomeModalOpen, setIsEditIncomeModalOpen] = useState(false);
  const [isEditAssetModalOpen, setIsEditAssetModalOpen] = useState(false);
  const [isEditLiabilityModalOpen, setIsEditLiabilityModalOpen] = useState(false);
  const [isEditSourceOfWealthModalOpen, setIsEditSourceOfWealthModalOpen] = useState(false);
  const [isEditInvestmentExperienceModalOpen, setIsEditInvestmentExperienceModalOpen] = useState(false);

  // Selected item index for editing
  const [selectedIncomeIndex, setSelectedIncomeIndex] = useState<number>(0);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number>(0);
  const [selectedLiabilityIndex, setSelectedLiabilityIndex] = useState<number>(0);
  const [selectedSourceOfWealthIndex, setSelectedSourceOfWealthIndex] = useState<number>(0);

  // Calculate net worth
  const netWorth = getNetWorth();

  // Add handlers
  const handleAddIncome = () => {
    setIsAddIncomeModalOpen(true);
  };

  const handleAddAsset = () => {
    setIsAddAssetModalOpen(true);
  };

  const handleAddLiability = () => {
    setIsAddLiabilityModalOpen(true);
  };

  const handleAddSourceOfWealth = () => {
    setIsAddSourceOfWealthModalOpen(true);
  };

  // Edit handlers
  const handleEditIncome = (index: number) => {
    setSelectedIncomeIndex(index);
    setIsEditIncomeModalOpen(true);
  };

  const handleEditAsset = (index: number) => {
    setSelectedAssetIndex(index);
    setIsEditAssetModalOpen(true);
  };

  const handleEditLiability = (index: number) => {
    setSelectedLiabilityIndex(index);
    setIsEditLiabilityModalOpen(true);
  };

  const handleEditSourceOfWealth = (index: number) => {
    setSelectedSourceOfWealthIndex(index);
    setIsEditSourceOfWealthModalOpen(true);
  };

  const handleEditInvestmentExperience = () => {
    setIsEditInvestmentExperienceModalOpen(true);
  };

  // Save handlers for adding
  const handleAddNewIncome = (income: Income) => {
    // TODO: Implement API call to add income
    addIncome(income);
    console.log('Adding income:', income);
  };

  const handleAddNewAsset = (asset: Asset) => {
    // TODO: Implement API call to add asset
    addAsset(asset);
    console.log('Adding asset:', asset);
  };

  const handleAddNewLiability = (liability: Liability) => {
    // TODO: Implement API call to add liability
    addLiability(liability);
    console.log('Adding liability:', liability);
  };

  const handleAddNewSourceOfWealth = (source: SourceOfWealth) => {
    // TODO: Implement API call to add source of wealth
    addSourceOfWealth(source);
    console.log('Adding source of wealth:', source);
  };

  // Save handlers for editing
  const handleSaveIncome = (income: Income) => {
    updateIncome(selectedIncomeIndex, income);
    console.log('Saving income:', income);
  };

  const handleSaveAsset = (asset: Asset) => {
    updateAsset(selectedAssetIndex, asset);
    console.log('Saving asset:', asset);
  };

  const handleSaveLiability = (liability: Liability) => {
    updateLiability(selectedLiabilityIndex, liability);
    console.log('Saving liability:', liability);
  };

  const handleSaveSourceOfWealth = (source: SourceOfWealth) => {
    updateSourceOfWealth(selectedSourceOfWealthIndex, source);
    console.log('Saving source of wealth:', source);
  };

  const handleSaveInvestmentExperience = (experience: InvestmentExperience) => {
    // TODO: Implement API call to save investment experience
    updateInvestmentExperience(experience);
    console.log('Saving investment experience:', experience);
  };

  const isReadOnly = !isUser;

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="mx-auto ">
      <Title text="Know Your Customer Information" variant='large'/>

      <div className="gap-4 flex flex-col">
        {/* Personal Information Section */}
        <PersonalInformationCard data={user} />

        {/* Financial Status Section */}
        <div className="mt-2">
          <h2 className="text-2xl font-bold mb-4">Financial Status</h2>

          {/* Incomes */}
          <div className="mb-4">
            <IncomesCard
              incomes={incomes}
              isReadOnly={isReadOnly}
              onEdit={handleEditIncome}
              onAdd={handleAddIncome}
            />
          </div>

          {/* Assets */}
          <div className="mb-4">
            <AssetsCard
              assets={assets}
              isReadOnly={isReadOnly}
              onEdit={handleEditAsset}
              onAdd={handleAddAsset}
            />
          </div>

          {/* Liabilities */}
          <div className="mb-4">
            <LiabilitiesCard
              liabilities={liabilities}
              isReadOnly={isReadOnly}
              onEdit={handleEditLiability}
              onAdd={handleAddLiability}
            />
          </div>

          {/* Source of Wealth */}
          <div className="mb-4">
            <SourceOfWealthCard
              sourceOfWealth={sourceOfWealth}
              isReadOnly={isReadOnly}
              onEdit={handleEditSourceOfWealth}
              onAdd={handleAddSourceOfWealth}
            />
          </div>

          {/* Net Worth */}
          <NetWorthCard netWorth={netWorth} currency="USD" />
        </div>

        {/* Investment Experience and Objectives */}
        <InvestmentExperienceCard
          investmentExperience={investmentExperience}
          isReadOnly={isReadOnly}
          onEdit={handleEditInvestmentExperience}
        />
      </div>

      {/* Add Modals */}
      <AddIncomeModal
        isOpen={isAddIncomeModalOpen}
        onClose={() => setIsAddIncomeModalOpen(false)}
        onAdd={handleAddNewIncome}
      />
      <AddAssetModal
        isOpen={isAddAssetModalOpen}
        onClose={() => setIsAddAssetModalOpen(false)}
        onAdd={handleAddNewAsset}
      />
      <AddLiabilityModal
        isOpen={isAddLiabilityModalOpen}
        onClose={() => setIsAddLiabilityModalOpen(false)}
        onAdd={handleAddNewLiability}
      />
      <AddSourceOfWealthModal
        isOpen={isAddSourceOfWealthModalOpen}
        onClose={() => setIsAddSourceOfWealthModalOpen(false)}
        onAdd={handleAddNewSourceOfWealth}
      />

      {/* Edit Modals */}
      <EditIncomeModal
        isOpen={isEditIncomeModalOpen}
        onClose={() => setIsEditIncomeModalOpen(false)}
        income={incomes[selectedIncomeIndex] || { type: 'Salary', amount: 0, currency: 'USD' }}
        onSave={handleSaveIncome}
      />
      <EditAssetModal
        isOpen={isEditAssetModalOpen}
        onClose={() => setIsEditAssetModalOpen(false)}
        asset={assets[selectedAssetIndex] || { type: 'Bond', amount: 0, currency: 'USD' }}
        onSave={handleSaveAsset}
      />
      <EditLiabilityModal
        isOpen={isEditLiabilityModalOpen}
        onClose={() => setIsEditLiabilityModalOpen(false)}
        liability={liabilities[selectedLiabilityIndex] || { type: 'Personal Loan', amount: 0, currency: 'USD' }}
        onSave={handleSaveLiability}
      />
      <EditSourceOfWealthModal
        isOpen={isEditSourceOfWealthModalOpen}
        onClose={() => setIsEditSourceOfWealthModalOpen(false)}
        sourceOfWealth={sourceOfWealth[selectedSourceOfWealthIndex] || { type: 'Inheritance', amount: 0, currency: 'USD' }}
        onSave={handleSaveSourceOfWealth}
      />
      <EditInvestmentExperienceModal
        isOpen={isEditInvestmentExperienceModalOpen}
        onClose={() => setIsEditInvestmentExperienceModalOpen(false)}
        investmentExperience={investmentExperience}
        onSave={handleSaveInvestmentExperience}
      />
    </div>
  );
}
