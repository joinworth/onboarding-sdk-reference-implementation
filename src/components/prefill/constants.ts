import type { PrefillFormData } from '@/types/prefill';

export const getInitialFormData = (): PrefillFormData => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return {
    external_id: `sdk-demo-${randomNumber}`,
    name: 'sdk demo 1',
    address_line_1: '601-7 Sansburys Way',
    address_city: 'West Palm Beach',
    address_state: 'FL',
    address_postal_code: '33411',
    tin: '942404110',
    owner1_first_name: '',
    owner1_last_name: '',
    owner1_email: '',
    owner1_mobile: '',
    owner1_ssn: '',
    owner1_dob: '',
    owner1_address_line_1: '',
    owner1_address_city: '',
    owner1_address_state: '',
    owner1_address_postal: '',
    owner1_address_country: '',
    owner1_title: '',
    owner1_owner_type: '',
    owner1_ownership_percentage: 0,
    applicant_first_name: '',
    applicant_last_name: '',
    applicant_email: '',
    applicant_subrole_code: 'owner',
    generate_invite_link: true,
    is_simple_flow: true,
  };
};

export const countryOptions = [{ value: 'US', label: 'United States' }];

export const ownerTypeOptions = [{ value: 'CONTROL', label: 'Control' }];

export const subroleCodeOptions = [{ value: 'owner', label: 'Owner' }];
