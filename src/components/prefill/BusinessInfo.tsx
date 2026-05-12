import type { ReactElement } from 'react';
import type { PrefillFormData } from '@/types/prefill';
import type { PrefillCountry } from './constants';
import FormField from './FormField';

interface BusinessInfoProps {
  formData: PrefillFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  country?: PrefillCountry;
}

const BusinessInfo = ({
  formData,
  onChange,
  country = 'US',
}: BusinessInfoProps): ReactElement => {
  const isUk = country === 'UK';

  return (
    <>
      <FormField
        label="External ID"
        name="external_id"
        value={formData.external_id}
        onChange={onChange}
        required
      />
      <FormField
        label="Business Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
      />
      <FormField
        label="Address Line 1"
        name="address_line_1"
        value={formData.address_line_1}
        onChange={onChange}
        required
      />
      <FormField
        label="City"
        name="address_city"
        value={formData.address_city}
        onChange={onChange}
        required
      />
      <FormField
        label={isUk ? 'County' : 'State'}
        name="address_state"
        value={formData.address_state}
        onChange={onChange}
        required
      />
      <FormField
        label="Postal Code"
        name="address_postal_code"
        value={formData.address_postal_code}
        onChange={onChange}
        required
      />
      <FormField
        label={
          isUk
            ? 'CRN/UTR/VAT Number'
            : 'TIN (Tax Identification Number)'
        }
        name="tin"
        value={formData.tin}
        onChange={onChange}
      />
    </>
  );
};

export default BusinessInfo;
