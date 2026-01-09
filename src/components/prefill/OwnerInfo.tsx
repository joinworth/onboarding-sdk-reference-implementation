import type { ReactElement } from 'react';
import type { PrefillFormData } from '@/types/prefill';
import FormField from './FormField';
import { countryOptions, ownerTypeOptions } from './constants';

interface OwnerInfoProps {
  formData: PrefillFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const OwnerInfo = ({ formData, onChange }: OwnerInfoProps): ReactElement => (
  <>
    <FormField
      label="First Name"
      name="owner1_first_name"
      value={formData.owner1_first_name}
      onChange={onChange}
    />
    <FormField
      label="Last Name"
      name="owner1_last_name"
      value={formData.owner1_last_name}
      onChange={onChange}
    />
    <FormField
      label="Email"
      name="owner1_email"
      type="email"
      value={formData.owner1_email}
      onChange={onChange}
    />
    <FormField
      label="Mobile"
      name="owner1_mobile"
      type="tel"
      value={formData.owner1_mobile}
      onChange={onChange}
    />
    <FormField
      label="SSN"
      name="owner1_ssn"
      value={formData.owner1_ssn}
      onChange={onChange}
    />
    <FormField
      label="Date of Birth"
      name="owner1_dob"
      type="date"
      value={formData.owner1_dob}
      onChange={onChange}
    />
    <FormField
      label="Address Line 1"
      name="owner1_address_line_1"
      value={formData.owner1_address_line_1}
      onChange={onChange}
    />
    <FormField
      label="City"
      name="owner1_address_city"
      value={formData.owner1_address_city}
      onChange={onChange}
    />
    <FormField
      label="State"
      name="owner1_address_state"
      value={formData.owner1_address_state}
      onChange={onChange}
    />
    <FormField
      label="Postal Code"
      name="owner1_address_postal"
      value={formData.owner1_address_postal}
      onChange={onChange}
    />
    <FormField
      label="Country"
      name="owner1_address_country"
      type="select"
      value={formData.owner1_address_country}
      onChange={onChange}
      options={countryOptions}
    />
    <FormField
      label="Title"
      name="owner1_title"
      value={formData.owner1_title}
      onChange={onChange}
    />
    <FormField
      label="Owner Type"
      name="owner1_owner_type"
      type="select"
      value={formData.owner1_owner_type}
      onChange={onChange}
      options={ownerTypeOptions}
    />
    <FormField
      label="Ownership Percentage"
      name="owner1_ownership_percentage"
      type="number"
      value={formData.owner1_ownership_percentage}
      onChange={onChange}
    />
  </>
);

export default OwnerInfo;
