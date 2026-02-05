import { FormIcon } from "@/icons/FormIcon";
import { IdvIcon } from "@/icons/IdvIcon";
import { StackIcon } from "@/icons/StackIcon";


const DemoFlows: React.FC = () => {
    const cards = [
        {
            icon: <IdvIcon className="text-white" />,
            title: 'IDV Quick Add',
            description: 'Streamlined flow to run selfie checks without onboarding form fields.',
        },
        {
            icon: <StackIcon />,
            title: 'Use a Token',
            description: 'Bring your own token and enter it into the UI to begin onboarding experience.',
        },
        {
            icon: <FormIcon />,
            title: 'Full Onboarding',
            description: 'Display all fields and pages associated to the onboarding experience.',
        },
    ];

    return <div className="min-h-fit py-12 px-6">
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-serif text-white mb-2">
                    Select a Demo
                </h1>
                <p className="text-white/70">
                    Choose a demo below to start the onboarding process.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-blue-gray rounded-xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                        <div className="mb-4 flex justify-left">
                            {card.icon}
                        </div>
                        <h3 className="text-3xl font-serif text-white mb-3 text-left">
                            {card.title}
                        </h3>
                        <p className="text-white/80 text-sm text-left leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>;
};

export default DemoFlows;
