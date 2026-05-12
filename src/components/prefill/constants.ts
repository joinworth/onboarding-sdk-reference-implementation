import type { PrefillFormData } from '@/types/prefill';

export type PrefillCountry = 'US' | 'UK';

export const getInitialFormData = (
  country: PrefillCountry = 'US',
): PrefillFormData => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  if (country === 'UK') {
    return {
      external_id: `sdk-demo-${randomNumber}`,
      name: 'sdk demo 1',
      address_line_1: '34 Old Bond Street',
      address_city: 'London',
      address_state: 'LND',
      address_postal_code: 'W1S4QL',
      tin: 'GB123456789',
      owner1_first_name: 'Leslie',
      owner1_last_name: 'Knope',
      owner1_email: `leslie.knope+${randomNumber}@joinworth.com`,
      owner1_mobile: '+442089401138',
      owner1_ssn: '',
      owner1_dob: '1975-01-18',
      owner1_address_line_1: '123 High St.',
      owner1_address_city: 'London',
      owner1_address_state: 'LND',
      owner1_address_postal: 'W1S4QL',
      owner1_address_country: 'GB',
      owner1_title: '1% Shareholder',
      owner1_owner_type: 'CONTROL',
      owner1_ownership_percentage: 100,
      applicant_first_name: 'Leslie',
      applicant_last_name: 'Knope',
      applicant_email: `leslie.knope+${randomNumber}@joinworth.com`,
      applicant_subrole_code: 'owner',
      generate_invite_link: true,
      flow: 'selfie-only-uk',
    };
  }

  return {
    external_id: `sdk-demo-${randomNumber}`,
    name: 'sdk demo 1',
    address_line_1: '601-7 Sansburys Way',
    address_city: 'West Palm Beach',
    address_state: 'FL',
    address_postal_code: '33411',
    tin: '942404110',
    owner1_first_name: 'Leslie',
    owner1_last_name: 'Knope',
    owner1_email: `leslie.knope+${randomNumber}@joinworth.com`,
    owner1_mobile: '+12345678909',
    owner1_ssn: '123456788',
    owner1_dob: '1975-01-18',
    owner1_address_line_1: '123 Main St.',
    owner1_address_city: 'Pawnee',
    owner1_address_state: 'IN',
    owner1_address_postal: '46001',
    owner1_address_country: 'US',
    owner1_title: '1% Shareholder',
    owner1_owner_type: 'CONTROL',
    owner1_ownership_percentage: 100,
    applicant_first_name: 'Leslie',
    applicant_last_name: 'Knope',
    applicant_email: `leslie.knope+${randomNumber}@joinworth.com`,
    applicant_subrole_code: 'owner',
    generate_invite_link: true,
    flow: 'full-flow',
  };
};

export const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
];

export const ownerTypeOptions = [{ value: 'CONTROL', label: 'Control' }];

export const subroleCodeOptions = [{ value: 'owner', label: 'Owner' }];
