export interface Income {
  type: 'Salary' | 'Investment' | 'Others';
  amount: number;
  currency: string;
}

export interface Asset {
  type: 'Bond' | 'Liquidity' | 'Real Estate' | 'Others';
  amount: number;
  currency: string;
}

export interface Liability {
  type: 'Personal Loan' | 'Real Estate Loan' | 'Others';
  amount: number;
  currency: string;
}

export interface SourceOfWealth {
  type: 'Inheritance' | 'Donation';
  amount: number;
  currency: string;
}

export interface InvestmentExperience {
  experienceInFinancialMarkets: '< 5 years' | '> 5 and < 10 years' | '> 10 years';
  riskTolerance: '10%' | '30%' | 'All-in';
}

export interface KYCData {
  incomes: Income[];
  assets: Asset[];
  liabilities: Liability[];
  sourceOfWealth: SourceOfWealth[];
  investmentExperience: InvestmentExperience;
}
