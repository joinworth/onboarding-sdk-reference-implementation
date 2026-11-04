import ApplicantInfo from '@/components/prefill/ApplicantInfo';
import BusinessInfo from '@/components/prefill/BusinessInfo';
import type { PrefillCountry } from '@/components/prefill/constants';
import { getInitialFormData } from '@/components/prefill/constants';
import FormSection from '@/components/prefill/FormSection';
import OwnerInfo from '@/components/prefill/OwnerInfo';
import { convertFormValue } from '@/components/prefill/utils';
import { useWorthContext } from '@/components/worth/useWorthContext';
import { getToken } from '@/services/token';
import type { PrefillFlow, PrefillFormData } from '@/types/prefill';
import { useSnackbar } from 'notistack';
import { useState, type FormEvent, type ReactElement } from 'react';
import { useNavigate } from 'react-router';
import DemoShell from './DemoShell';

interface IdvQuickAddProps {
    country: PrefillCountry;
    /** SDK 3 runs the customer's IDV Quick Add onboarding template; SDK 2 the legacy selfie flow. */
    sdk: 2 | 3;
}

/** Lambda flow id and the page that mounts the SDK, per SDK and country. */
const SDK_TARGETS: Record<2 | 3, Record<PrefillCountry, PrefillFlow> & { path: string }> = {
    2: { US: 'selfie-only', UK: 'selfie-only-uk', path: '/onboarding' },
    3: { US: 'selfie-only-sdk3', UK: 'selfie-only-uk-sdk3', path: '/onboarding-sdk-3' },
};

const IdvQuickAdd = ({ country, sdk }: IdvQuickAddProps): ReactElement => {
    const { setOnboardingInviteToken, setFlow } = useWorthContext();
    const [formData, setFormData] =
        useState<PrefillFormData>(getInitialFormData(country));
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
            const target = SDK_TARGETS[sdk];
            const flow = target[country];
            const token = await getToken({ ...formData, flow});
            setFlow(flow);
            setOnboardingInviteToken(token);
            navigate(target.path);
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

    const regionLabel = country === 'UK' ? '(UK)' : '(US)';

    return (
        <DemoShell
            title={`IDV Quick Add ${regionLabel}${sdk === 3 ? ' (SDK 3)' : ''}`}
            description="Enter the required information to run an IDV quick add."
        >
            <form onSubmit={handleSubmit} className="sdk-form space-y-6">
                <FormSection title="Business Information">
                    <BusinessInfo
                        formData={formData}
                        onChange={handleInputChange}
                        country={country}
                    />
                </FormSection>

                <FormSection title="Owner Information">
                    <OwnerInfo
                        formData={formData}
                        onChange={handleInputChange}
                        country={country}
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
                        onClick={() =>
                            setFormData(getInitialFormData(country))
                        }
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

export default IdvQuickAdd;
