import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Income, Asset, Liability, SourceOfWealth, InvestmentExperience } from './types';

interface KYCState {
  incomes: Income[];
  assets: Asset[];
  liabilities: Liability[];
  sourceOfWealth: SourceOfWealth[];
  investmentExperience: InvestmentExperience;
  
  // Income actions
  addIncome: (income: Income) => void;
  updateIncome: (index: number, income: Income) => void;
  removeIncome: (index: number) => void;
  
  // Asset actions
  addAsset: (asset: Asset) => void;
  updateAsset: (index: number, asset: Asset) => void;
  removeAsset: (index: number) => void;
  
  // Liability actions
  addLiability: (liability: Liability) => void;
  updateLiability: (index: number, liability: Liability) => void;
  removeLiability: (index: number) => void;
  
  // Source of Wealth actions
  addSourceOfWealth: (source: SourceOfWealth) => void;
  updateSourceOfWealth: (index: number, source: SourceOfWealth) => void;
  removeSourceOfWealth: (index: number) => void;
  
  // Investment Experience actions
  updateInvestmentExperience: (experience: InvestmentExperience) => void;
  
  // Net Worth calculation
  getNetWorth: () => number;
  
  // Reset all KYC data
  resetKYC: () => void;
}

const defaultInvestmentExperience: InvestmentExperience = {
  experienceInFinancialMarkets: '< 5 years',
  riskTolerance: '10%',
};

// Mock data for development/testing
const mockIncomes: Income[] = [
  { type: 'Salary', amount: 120000, currency: 'USD' },
  { type: 'Investment', amount: 45000, currency: 'USD' },
  { type: 'Others', amount: 15000, currency: 'USD' },
];

const mockAssets: Asset[] = [
  { type: 'Bond', amount: 250000, currency: 'USD' },
  { type: 'Liquidity', amount: 85000, currency: 'USD' },
  { type: 'Real Estate', amount: 500000, currency: 'USD' },
  { type: 'Others', amount: 120000, currency: 'USD' },
];

const mockLiabilities: Liability[] = [
  { type: 'Real Estate Loan', amount: 350000, currency: 'USD' },
  { type: 'Personal Loan', amount: 25000, currency: 'USD' },
];

const mockSourceOfWealth: SourceOfWealth[] = [
  { type: 'Inheritance', amount: 200000, currency: 'USD' },
];

const mockInvestmentExperience: InvestmentExperience = {
  experienceInFinancialMarkets: '> 5 and < 10 years',
  riskTolerance: '30%',
};

export const useKYCStore = create<KYCState>()(
  persist(
    (set, get) => ({
      incomes: mockIncomes,
      assets: mockAssets,
      liabilities: mockLiabilities,
      sourceOfWealth: mockSourceOfWealth,
      investmentExperience: mockInvestmentExperience,

      // Income actions
      addIncome: (income: Income) => {
        set((state) => ({
          incomes: [...state.incomes, income],
        }));
      },
      
      updateIncome: (index: number, income: Income) => {
        set((state) => {
          const updatedIncomes = [...state.incomes];
          updatedIncomes[index] = income;
          return { incomes: updatedIncomes };
        });
      },
      
      removeIncome: (index: number) => {
        set((state) => ({
          incomes: state.incomes.filter((_, i) => i !== index),
        }));
      },

      // Asset actions
      addAsset: (asset: Asset) => {
        set((state) => ({
          assets: [...state.assets, asset],
        }));
      },
      
      updateAsset: (index: number, asset: Asset) => {
        set((state) => {
          const updatedAssets = [...state.assets];
          updatedAssets[index] = asset;
          return { assets: updatedAssets };
        });
      },
      
      removeAsset: (index: number) => {
        set((state) => ({
          assets: state.assets.filter((_, i) => i !== index),
        }));
      },

      // Liability actions
      addLiability: (liability: Liability) => {
        set((state) => ({
          liabilities: [...state.liabilities, liability],
        }));
      },
      
      updateLiability: (index: number, liability: Liability) => {
        set((state) => {
          const updatedLiabilities = [...state.liabilities];
          updatedLiabilities[index] = liability;
          return { liabilities: updatedLiabilities };
        });
      },
      
      removeLiability: (index: number) => {
        set((state) => ({
          liabilities: state.liabilities.filter((_, i) => i !== index),
        }));
      },

      // Source of Wealth actions
      addSourceOfWealth: (source: SourceOfWealth) => {
        set((state) => ({
          sourceOfWealth: [...state.sourceOfWealth, source],
        }));
      },
      
      updateSourceOfWealth: (index: number, source: SourceOfWealth) => {
        set((state) => {
          const updatedSourceOfWealth = [...state.sourceOfWealth];
          updatedSourceOfWealth[index] = source;
          return { sourceOfWealth: updatedSourceOfWealth };
        });
      },
      
      removeSourceOfWealth: (index: number) => {
        set((state) => ({
          sourceOfWealth: state.sourceOfWealth.filter((_, i) => i !== index),
        }));
      },

      // Investment Experience actions
      updateInvestmentExperience: (experience: InvestmentExperience) => {
        set({ investmentExperience: experience });
      },

      // Net Worth calculation (A + B - C + D)
      getNetWorth: () => {
        const state = get();
        const totalIncomes = state.incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalAssets = state.assets.reduce((sum, asset) => sum + asset.amount, 0);
        const totalLiabilities = state.liabilities.reduce((sum, liability) => sum + liability.amount, 0);
        const totalSourceOfWealth = state.sourceOfWealth.reduce((sum, source) => sum + source.amount, 0);
        
        return totalIncomes + totalAssets - totalLiabilities + totalSourceOfWealth;
      },

      // Reset all KYC data
      resetKYC: () => {
        set({
          incomes: [],
          assets: [],
          liabilities: [],
          sourceOfWealth: [],
          investmentExperience: defaultInvestmentExperience,
        });
      },
    }),
    {
      name: 'kyc-storage',
      partialize: (state) => ({
        incomes: state.incomes,
        assets: state.assets,
        liabilities: state.liabilities,
        sourceOfWealth: state.sourceOfWealth,
        investmentExperience: state.investmentExperience,
      }),
    }
  )
);

export default useKYCStore;
