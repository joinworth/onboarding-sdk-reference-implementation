import type { PrefillFlow } from '@/types/prefill';
import { createContext, type SetStateAction } from 'react';

export const WorthContext = createContext<{
  onboardingInviteToken: string;
  setOnboardingInviteToken: React.Dispatch<SetStateAction<string>>;
  flow: PrefillFlow | undefined;
  setFlow: React.Dispatch<React.SetStateAction<PrefillFlow | undefined>>;
}>({} as any);
