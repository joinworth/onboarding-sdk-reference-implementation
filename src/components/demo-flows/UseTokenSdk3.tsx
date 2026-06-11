import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FormField from "../prefill/FormField";
import FormSection from "../prefill/FormSection";
import { useWorthContext } from "../worth/useWorthContext";

const UseTokenSdk3: React.FC = () => {
    const [token, setToken] = useState('');
    const { setOnboardingInviteToken, setFlow } = useWorthContext();
    const navigate = useNavigate();
    const trimmedToken = token.trim();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!trimmedToken) {
            return;
        }

        try {
            setFlow(undefined);
            setOnboardingInviteToken(trimmedToken);
            navigate('/onboarding-sdk-3');
        } catch (error) {
            console.error(error);
        }
    };

    return <div className="min-h-fit py-12 px-6">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-serif text-white mb-2">
                    SDK 3 Invite Token ID
                </h1>
                <p className="text-white/70">
                    Begin the SDK 3 embedded onboarding experience using an invite token.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="sdk-form space-y-6">
                <FormSection title="SDK 3 Invite Token ID">
                    <FormField
                        label="Token ID"
                        value={token}
                        onChange={(event) => { setToken(event.target.value) }}
                        required
                    />
                </FormSection>
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        className="button-secondary-dark cursor-pointer"
                        onClick={() => setToken('')}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="button-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!trimmedToken}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
}

export default UseTokenSdk3
