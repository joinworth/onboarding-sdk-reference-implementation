import { useEffect, useState } from 'react';
import { WorthContext } from './WorthContext';

export interface WorthProviderProps {
  children?: React.ReactNode;
}

const TOKEN_STORAGE_KEY = 'onboarding_token';

export const WorthProvider: React.FC<WorthProviderProps> = ({ children }) => {
  const [onboardingInviteToken, setOnboardingInviteToken] = useState(
    localStorage.getItem(TOKEN_STORAGE_KEY) || '',
  );

  useEffect(() => {
    localStorage.setItem(TOKEN_STORAGE_KEY, onboardingInviteToken);
  }, [onboardingInviteToken]);

  return (
    <WorthContext.Provider
      value={{ onboardingInviteToken, setOnboardingInviteToken }}
    >
      {children}
    </WorthContext.Provider>
  );
};
