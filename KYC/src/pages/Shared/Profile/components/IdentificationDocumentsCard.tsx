import Card from '@/components/card';
import Title from '@/components/title';
import type { IdentificationDocuments } from '../types';

interface IdentificationDocumentsCardProps {
  documents: IdentificationDocuments;
  isReadOnly: boolean;
  onFileChange: (field: 'id' | 'driverLicense', file: File | null) => void;
}

export default function IdentificationDocumentsCard({ documents, isReadOnly, onFileChange }: IdentificationDocumentsCardProps) {
  return (
    <Card>
      <Title text="Identification Documents" />
      <p className="text-sm text-gray-600 mb-4">At least one of passport, national ID card, or driver's license is required.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID / Passport / National ID Card *
          </label>
          <input
            type="file"
            onChange={(e) => onFileChange('id', e.target.files?.[0] || null)}
            disabled={isReadOnly}
            accept="image/*,.pdf"
            className="w-full px-4 py-2.5 border bg-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring-focus"
          />
          {documents.id && (
            <p className="text-sm text-gray-600 mt-1">
              {typeof documents.id === 'string'
                ? documents.id
                : documents.id.name}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Driver License
          </label>
          <input
            type="file"
            onChange={(e) => onFileChange('driverLicense', e.target.files?.[0] || null)}
            disabled={isReadOnly}
            accept="image/*,.pdf"
            className="w-full px-4 py-2.5 border bg-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring-focus"
          />
          {documents.driverLicense && (
            <p className="text-sm text-gray-600 mt-1">
              {typeof documents.driverLicense === 'string'
                ? documents.driverLicense
                : documents.driverLicense.name}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
