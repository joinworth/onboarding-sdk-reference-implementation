import type { ReactElement } from 'react';
import type { PrefillFormData } from '@/types/prefill';
import FormField from './FormField';

interface BusinessInfoProps {
  formData: PrefillFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const BusinessInfo = ({
  formData,
  onChange,
}: BusinessInfoProps): ReactElement => (
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
      label="State"
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
      label="TIN (Tax Identification Number)"
      name="tin"
      value={formData.tin}
      onChange={onChange}
      required
    />
  </>
);

export default BusinessInfo;
