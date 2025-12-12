import type { ReactElement } from 'react';
import type { PrefillFormData } from '@/types/prefill';
import FormField from './FormField';
import { subroleCodeOptions } from './constants';

interface ApplicantInfoProps {
  formData: PrefillFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const ApplicantInfo = ({
  formData,
  onChange,
}: ApplicantInfoProps): ReactElement => (
  <>
    <FormField
      label="First Name"
      name="applicant_first_name"
      value={formData.applicant_first_name}
      onChange={onChange}
      required
    />
    <FormField
      label="Last Name"
      name="applicant_last_name"
      value={formData.applicant_last_name}
      onChange={onChange}
      required
    />
    <FormField
      label="Email"
      name="applicant_email"
      type="email"
      value={formData.applicant_email}
      onChange={onChange}
      required
    />
    <FormField
      label="Subrole Code"
      name="applicant_subrole_code"
      type="select"
      value={formData.applicant_subrole_code}
      onChange={onChange}
      options={subroleCodeOptions}
      required
    />
  </>
);

export default ApplicantInfo;
