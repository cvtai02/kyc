import { create } from 'zustand';

export interface KYCSubmission {
  id: string;
  name: string;
  status: 'Active' | 'Pending' | 'Inactive';
  date: string;
}

export interface ReviewedResult {
  id: string;
  name: string;
  date: string;
  finalStatus: 'Approved' | 'Rejected';
}

interface OfficerStore {
  submissions: KYCSubmission[];
  results: ReviewedResult[];
  approveSubmission: (id: string) => void;
  rejectSubmission: (id: string) => void;
}

const mockSubmissions: KYCSubmission[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    status: 'Pending',
    date: '2024-12-01',
  },
  {
    id: '2',
    name: 'Michael Williams',
    status: 'Pending',
    date: '2024-12-05',
  },
  {
    id: '3',
    name: 'Sophia Brown',
    status: 'Active',
    date: '2024-11-28',
  },
  {
    id: '4',
    name: 'James Davis',
    status: 'Pending',
    date: '2024-12-03',
  },
  {
    id: '5',
    name: 'Emma Miller',
    status: 'Inactive',
    date: '2024-11-25',
  },
  {
    id: '6',
    name: 'Olivia Wilson',
    status: 'Pending',
    date: '2024-12-06',
  },
  {
    id: '7',
    name: 'Alexander Jones',
    status: 'Active',
    date: '2024-11-30',
  },
];

const mockResults: ReviewedResult[] = [
  {
    id: '8',
    name: 'Ava Taylor',
    date: '2024-12-01',
    finalStatus: 'Approved',
  },
  {
    id: '9',
    name: 'Ethan Martinez',
    date: '2024-12-02',
    finalStatus: 'Rejected',
  },
  {
    id: '10',
    name: 'Isabella Anderson',
    date: '2024-11-20',
    finalStatus: 'Approved',
  },
  {
    id: '11',
    name: 'Liam Garcia',
    date: '2024-11-28',
    finalStatus: 'Rejected',
  },
  {
    id: '12',
    name: 'Mia Rodriguez',
    date: '2024-12-03',
    finalStatus: 'Approved',
  },
  {
    id: '13',
    name: 'Noah Hernandez',
    date: '2024-11-22',
    finalStatus: 'Approved',
  },
  {
    id: '14',
    name: 'Charlotte Lopez',
    date: '2024-11-24',
    finalStatus: 'Rejected',
  },
  {
    id: '15',
    name: 'William Gonzalez',
    date: '2024-11-26',
    finalStatus: 'Approved',
  },
  {
    id: '16',
    name: 'Avery Perez',
    date: '2024-11-29',
    finalStatus: 'Approved',
  },
  {
    id: '17',
    name: 'Evelyn Sanchez',
    date: '2024-12-04',
    finalStatus: 'Rejected',
  },
];

export const useOfficerStore = create<OfficerStore>((set) => ({
  submissions: mockSubmissions,
  results: mockResults,

  approveSubmission: (id: string) =>
    set((state) => {
      const submission = state.submissions.find((s) => s.id === id);
      if (!submission) return state;

      const newResult: ReviewedResult = {
        id: `${Date.now()}`,
        name: submission.name,
        date: new Date().toISOString().split('T')[0],
        finalStatus: 'Approved',
      };

      return {
        submissions: state.submissions.filter((s) => s.id !== id),
        results: [newResult, ...state.results],
      };
    }),

  rejectSubmission: (id: string) =>
    set((state) => {
      const submission = state.submissions.find((s) => s.id === id);
      if (!submission) return state;

      const newResult: ReviewedResult = {
        id: `${Date.now()}`,
        name: submission.name,
        date: new Date().toISOString().split('T')[0],
        finalStatus: 'Rejected',
      };

      return {
        submissions: state.submissions.filter((s) => s.id !== id),
        results: [newResult, ...state.results],
      };
    }),
}));
