import { useEffect, useState } from 'react';
import { WorthContext } from './WorthContext';
import type { PrefillFlow } from '@/types/prefill';

export interface WorthProviderProps {
  children?: React.ReactNode;
}

const TOKEN_STORAGE_KEY = 'onboarding_token';
const FLOW_STORAGE_KEY = 'flow';

const clearLegacyLocalStorage = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(FLOW_STORAGE_KEY);
};

export const WorthProvider: React.FC<WorthProviderProps> = ({ children }) => {
  const [flow, setFlow] = useState<PrefillFlow>();
  const [onboardingInviteToken, setOnboardingInviteToken] = useState(
    () => sessionStorage.getItem(TOKEN_STORAGE_KEY) || '',
  );

  useEffect(() => {
    clearLegacyLocalStorage();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(FLOW_STORAGE_KEY, flow || '');
  }, [flow]);

  useEffect(() => {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, onboardingInviteToken);
  }, [onboardingInviteToken]);

  return (
    <WorthContext.Provider
      value={{ onboardingInviteToken, setOnboardingInviteToken, flow, setFlow }}
    >
      {children}
    </WorthContext.Provider>
  );
};
