import ApplicantInfo from '@/components/prefill/ApplicantInfo';
import BusinessInfo from '@/components/prefill/BusinessInfo';
import { initialFormData } from '@/components/prefill/constants';
import FormSection from '@/components/prefill/FormSection';
import OwnerInfo from '@/components/prefill/OwnerInfo';
import { convertFormValue } from '@/components/prefill/utils';
import { AppContext } from '@/context/app';
// import { getToken } from '@/services/token';
import type { PrefillFormData } from '@/types/prefill';
import { useContext, useState, type FormEvent, type ReactElement } from 'react';
import { useNavigate } from 'react-router';

const PrefillForm = (): ReactElement => {
  const [formData, setFormData] = useState<PrefillFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    const convertedValue = convertFormValue(value, type, checked);

    setFormData((prev) => ({
      ...prev,
      [name]: convertedValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // const token = await getToken(formData);
      const token =
        'eyJhbGciOiJIUzI1NiJ9.VTJGc2RHVmtYMSs3STB2QW4wYjNHZTErN0lYTHNqeUQ2c3NlcW5jbUZEcU9MaHBvVy9MbHJHRll3a2Z2TzRVTVVMSXRSZUpXY2lwTC9FNTJDS0pDRXVVZWtIK3pSd0pHai84V0dFMEdUcWc0R3NjdUZSY3p6cTJYbEpmaXFpY0ZCbkZrMlVpQ0ZWY1IrS2RUaE43aFAvOXdMUm4wckZ3dklSNFFNUXJiWnNYdWRqQkFvVFNjY0Zzbm1yWER0czJEVHN1SjZ1MHlzL3o4NkZ0RFd3Ym90S29tN3VKT2tQemlQVC9WYnBMZ1htQUFaTTBueVJEMmtBOE1ORFJrR0lXQjVJSldVWmJseU1XSWVZdEZrZ3lGNGRXU3pxblc1YkNmb00zQU1abk8vT2tJbllwZDJrUGsxVUN5Qm5lRG1BTTRkQXhhY0F3djZrK09XU3YxbWJrKyt5VWlrZ1VhZW92Um5mVE1sNWU1em0yNkVvMDY4WTU0aGpsZysvdkxXZ1RrbG9pTzQzdDYzb0docytPeGEyRkh1eG8rNEN5OWdReWdGK3NuUzEwZXFWYmNyWE1yZmxGWjBvZ2cvWUxpYmgvRUpCbHpXblp0Y1pxMVZIUzlETFoxQzJXM2xvaHVmUWsrOW4veTNxZ0Q1Q1FWaUZPYWJTUXVjVGRHT2FvYlhlbVJDaDNMVUltYzFHSWZnaHFEc25tdS9hdTNONk9vamJDamN0QmZaUWNsODZOSjVCQUZFQnYxRy80cWhnL3ovdTFWelN4V2VtaFJVdlp1aUdwVkZFbDlNRDdEMTE2M3VjMTYzV0V1eTRmQ3N1QlJtWmN2N0FFTEZZdks1VzZjNlJZMU93a3BvTERzSHBlNmU2cGJDSmNFY2ZCcWluZU9pTUVKek1kT1dHMWE0WFZYbDBKVXZUTy9LMnpOdGFNR2s2TjE.3XooOZcgw-6u7eYyMJaCKxLfEbWhDldK15XOzfViF78';
      console.log('Token:', token);
      setToken(token);
      navigate('/onboarding');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-fit py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-white mb-2">
            Onboarding Form Demo
          </h1>
          <p className="text-white/70">
            Fill out the form below to start the onboarding process.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Business Information">
            <BusinessInfo formData={formData} onChange={handleInputChange} />
          </FormSection>

          <FormSection title="Owner Information">
            <OwnerInfo formData={formData} onChange={handleInputChange} />
          </FormSection>

          <FormSection title="Applicant Information">
            <ApplicantInfo formData={formData} onChange={handleInputChange} />
          </FormSection>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="button-secondary-dark cursor-pointer"
              onClick={() => setFormData(initialFormData)}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrefillForm;
