export interface BasicInformation {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string; // DD/MM/YYYY format
  age: number; // Calculated from dateOfBirth
}

export interface Email {
  email: string;
  type: 'Work' | 'Personal';
  preferred: boolean;
}

export interface Phone {
  number: string;
  type: 'Work' | 'Personal';
  preferred: boolean;
}

export interface Address {
  country: string;
  city: string;
  street: string;
  postalCode?: string;
  type: 'Mailing' | 'Work';
}

export interface IdentificationDocuments {
  id?: File | string; // File for upload or string for URL
  driverLicense?: File | string;
}

export interface Employment {
  name: string;
  fromYear: number; // YYYY
  toYear?: number; // YYYY, must be greater than fromYear
}

export interface ProfileData {
  basicInformation: BasicInformation;
  emails: Email[];
  phones: Phone[];
  addresses: Address[];
  identificationDocuments: IdentificationDocuments;
  employments: Employment[];
}
