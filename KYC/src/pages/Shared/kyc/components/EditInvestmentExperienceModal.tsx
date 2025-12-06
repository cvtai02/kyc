import { useState, useEffect } from 'react';
import Modal from '@/components/modal';
import Select from '@/components/select';
import Button from '@/components/button';
import type { InvestmentExperience } from '../types';

interface EditInvestmentExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  investmentExperience: InvestmentExperience;
  onSave: (investmentExperience: InvestmentExperience) => void;
}

const experienceOptions = [
  { value: '< 5 years', label: '< 5 years' },
  { value: '> 5 and < 10 years', label: '> 5 and < 10 years' },
  { value: '> 10 years', label: '> 10 years' },
];

const riskToleranceOptions = [
  { value: '10%', label: '10%' },
  { value: '30%', label: '30%' },
  { value: 'All-in', label: 'All-in' },
];

export default function EditInvestmentExperienceModal({
  isOpen,
  onClose,
  investmentExperience,
  onSave,
}: EditInvestmentExperienceModalProps) {
  const [formData, setFormData] = useState<InvestmentExperience>(investmentExperience);

  useEffect(() => {
    setFormData(investmentExperience);
  }, [investmentExperience]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Investment Experience and Objectives" size="xxl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <Select
            label="Experience in Financial Markets"
            name="experienceInFinancialMarkets"
            value={formData.experienceInFinancialMarkets}
            onChange={handleChange}
            options={experienceOptions}
            required
          />
          <Select
            label="Risk Tolerance"
            name="riskTolerance"
            value={formData.riskTolerance}
            onChange={handleChange}
            options={riskToleranceOptions}
            required
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
