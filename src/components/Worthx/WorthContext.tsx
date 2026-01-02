import { createContext, type SetStateAction } from 'react';

export const WorthContext = createContext<{
  onboardingInviteToken: string;
  setOnboardingInviteToken: React.Dispatch<SetStateAction<string>>;
}>({} as any);
