import ApplicantInfo from '@/components/prefill/ApplicantInfo';
import BusinessInfo from '@/components/prefill/BusinessInfo';
import { getInitialFormData } from '@/components/prefill/constants';
import FormSection from '@/components/prefill/FormSection';
import { convertFormValue } from '@/components/prefill/utils';
import { useWorthContext } from '@/components/worth/useWorthContext';
import { getToken } from '@/services/token';
import type { PrefillFormData } from '@/types/prefill';
import { useSnackbar } from 'notistack';
import { useState, type FormEvent, type ReactElement } from 'react';
import { useNavigate } from 'react-router';
import DemoShell from './DemoShell';

const FullOnboarding = (): ReactElement => {
    const { setOnboardingInviteToken, setFlow } = useWorthContext();
    const [formData, setFormData] =
        useState<PrefillFormData>(getInitialFormData());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ): void => {
        const { name, value, type } = e.target;
        const checked =
            type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : undefined;

        const convertedValue = convertFormValue(value, type, checked);

        setFormData((prev) => ({
            ...prev,
            [name]: convertedValue,
        }));
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = await getToken({ ...formData});
            setFlow('full-flow');
            setOnboardingInviteToken(token);
            navigate('/onboarding');
        } catch (error) {
            enqueueSnackbar('Error submitting form.', {
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'error',
            });
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <DemoShell
            title="Onboarding Form Demo"
            description="Fill out the form below to start the onboarding process."
        >
            <form onSubmit={handleSubmit} className="sdk-form space-y-6">
                <FormSection title="Business Information">
                    <BusinessInfo
                        formData={formData}
                        onChange={handleInputChange}
                    />
                </FormSection>
                <FormSection title="Applicant Information">
                    <ApplicantInfo
                        formData={formData}
                        onChange={handleInputChange}
                    />
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
        </DemoShell>
    );
};

export default FullOnboarding;
