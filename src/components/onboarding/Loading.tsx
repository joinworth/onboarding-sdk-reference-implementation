import type { ReactElement } from 'react';

const Loading = (): ReactElement => {
  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-white/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif text-blue-950">
            Loading Onboarding
          </h2>
          <p className="text-blue-950/70">
            Please wait while we prepare your onboarding experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
