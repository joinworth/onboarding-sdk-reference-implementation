import type { ReactElement } from 'react';

const Success = (): ReactElement => {
  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif text-blue-950">
            Onboarding Complete!
          </h2>
          <p className="text-blue-950/70">
            Your onboarding process has been completed successfully.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;

