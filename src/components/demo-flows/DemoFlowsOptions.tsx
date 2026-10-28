import { FormIcon } from "@/icons/FormIcon";
import { IdvIcon } from "@/icons/IdvIcon";
import { StackIcon } from "@/icons/StackIcon";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

interface DemoFlow {
    sdk: 3 | 2;
    title: string;
    description: string;
    icon: ReactNode;
    /** Relative to /demo-flows; each one needs a route in src/router/index.tsx. */
    path: string;
}

/** Every demo tile. Adding a flow is one entry here plus its route. */
const DEMO_FLOWS: DemoFlow[] = [
    {
        sdk: 3,
        title: 'IDV Quick Add (UK)',
        description: 'Streamlined flow to run selfie checks without onboarding form fields.',
        icon: <IdvIcon className="text-white" />,
        path: 'idv-quick-add-uk-sdk-3',
    },
    {
        sdk: 3,
        title: 'IDV Quick Add (US)',
        description: 'Streamlined flow to run selfie checks without onboarding form fields.',
        icon: <IdvIcon className="text-white" />,
        path: 'idv-quick-add-us-sdk-3',
    },
    {
        sdk: 3,
        title: 'Use a Token',
        description: 'Bring your own token and enter it into the UI to begin the SDK 3 embedded onboarding experience.',
        icon: <StackIcon />,
        path: 'use-token-sdk-3',
    },
    {
        sdk: 2,
        title: 'IDV Quick Add (UK)',
        description: 'Streamlined flow to run selfie checks without onboarding form fields.',
        icon: <IdvIcon className="text-white" />,
        path: 'idv-quick-add-uk',
    },
    {
        sdk: 2,
        title: 'IDV Quick Add (US)',
        description: 'Streamlined flow to run selfie checks without onboarding form fields.',
        icon: <IdvIcon className="text-white" />,
        path: 'idv-quick-add-us',
    },
    {
        sdk: 2,
        title: 'Use a Token',
        description: 'Bring your own token and enter it into the UI to begin onboarding experience.',
        icon: <StackIcon />,
        path: 'use-token',
    },
    {
        sdk: 2,
        title: 'Full Onboarding',
        description: 'Display all fields and pages associated to the onboarding experience.',
        icon: <FormIcon />,
        path: 'full-onboarding',
    },
];

const SECTIONS = [
    { sdk: 3, title: 'SDK 3' },
    { sdk: 2, title: 'SDK 2 (legacy)' },
] as const;

const DemoFlowsOptions: React.FC = () => {
    const navigate = useNavigate();

    return <>
        <div className="mb-">
            <h1 className="text-4xl font-serif text-white mb-2">
                Select a Demo
            </h1>
            <p className="text-white/70">
                Choose a demo below to start the onboarding process.
            </p>
        </div>
        {SECTIONS.map((section) => (
            <section key={section.sdk} className="mt-8">
                <h2 className="text-2xl font-serif text-white">{section.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {DEMO_FLOWS.filter((flow) => flow.sdk === section.sdk).map((flow) => (
                        <div
                            onClick={() => navigate(flow.path)}
                            key={flow.path}
                            className="bg-blue-gray rounded-xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            <div className="mb-4 flex justify-left">
                                {flow.icon}
                            </div>
                            <h3 className="text-3xl font-serif text-white mb-3 text-left">
                                {flow.title}
                            </h3>
                            <p className="text-white/80 text-sm text-left leading-relaxed">
                                {flow.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        ))}
    </>
}

export default DemoFlowsOptions
