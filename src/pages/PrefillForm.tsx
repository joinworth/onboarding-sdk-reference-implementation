import ApplicantInfo from '@/components/prefill/ApplicantInfo';
import BusinessInfo from '@/components/prefill/BusinessInfo';
import { getInitialFormData } from '@/components/prefill/constants';
import FormSection from '@/components/prefill/FormSection';
import { convertFormValue } from '@/components/prefill/utils';
import { useWorthContext } from '@/components/worth/useWorthContext';
import { getToken } from '@/services/token';
import type { PrefillFormData } from '@/types/prefill';
import { useState, type FormEvent, type ReactElement } from 'react';
import { useNavigate } from 'react-router';

const PrefillForm = (): ReactElement => {
  const { setOnboardingInviteToken } = useWorthContext();
  const [formData, setFormData] =
    useState<PrefillFormData>(getInitialFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const token = await getToken(formData);
      setOnboardingInviteToken(token);
      navigate('/onboarding');
    } catch (error) {
      console.error('Error submitting form:', error);
      if (
        error instanceof Error &&
        (error as Error & { status?: number }).status === 400
      ) {
        alert(
          'This business already exists, change the External ID and Business Name fields',
        );
      }
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

          <FormSection title="Applicant Information">
            <ApplicantInfo formData={formData} onChange={handleInputChange} />
          </FormSection>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="button-secondary-dark cursor-pointer"
              onClick={() => setFormData(getInitialFormData())}
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
