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
    applicant_first_name: 'Leslie',
    applicant_last_name: 'Knope',
    applicant_email: `leslie.knope+${randomNumber}@joinworth.com`,
    applicant_subrole_code: 'owner',
    generate_invite_link: true,
    is_simple_flow: true,
  };
};

export const countryOptions = [{ value: 'US', label: 'United States' }];

export const ownerTypeOptions = [{ value: 'CONTROL', label: 'Control' }];

export const subroleCodeOptions = [{ value: 'owner', label: 'Owner' }];
