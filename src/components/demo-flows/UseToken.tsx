import { useWorthContext } from "../worth/useWorthContext";
import FormField from "../prefill/FormField";
import FormSection from "../prefill/FormSection";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import DemoShell from "./DemoShell";

const UseToken: React.FC = () => {
    const [token, setToken] = useState('');
    const { setOnboardingInviteToken, setFlow } = useWorthContext();
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            setFlow('use-token');
            setOnboardingInviteToken(token);
            navigate('/onboarding');
        } catch (error) {
            console.error(error);
        }
    };

    return <DemoShell
        title="Invite Token ID"
        description="Begin the standard onboarding process using an invite token."
    >
        <form onSubmit={handleSubmit} className="sdk-form space-y-6">
            <FormSection title="Invite Token ID">
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
                    disabled={!token}
                >
                    Submit
                </button>
            </div>
        </form>
    </DemoShell>
}

export default UseToken