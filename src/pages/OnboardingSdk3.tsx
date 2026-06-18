import {
  createWorthOnboarding,
  type WorthOnboarding,
} from '@worthai/onboarding-sdk';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { ORIGIN } from '@/constants/urls';
import { useWorthContext } from '@/components/worth/useWorthContext';

const normalizeError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const OnboardingSdk3 = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const onboardingRef = useRef<WorthOnboarding | null>(null);
  const { onboardingInviteToken } = useWorthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [mountError, setMountError] = useState('');

  const inviteToken = useMemo(
    () => onboardingInviteToken.trim(),
    [onboardingInviteToken],
  );

  useEffect(() => {
    if (!inviteToken) {
      navigate('/demo-flows/use-token-sdk-3', { replace: true });
      return;
    }

    if (!mountRef.current) {
      return;
    }

    let isActive = true;
    let onboarding: WorthOnboarding | undefined;

    const reportError = (error: unknown) => {
      if (!isActive) {
        return;
      }

      const message = normalizeError(error);
      setMountError(message);
      enqueueSnackbar(message, {
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'error',
      });
    };

    const mountSdk = async () => {
      try {
        setMountError('');
        onboarding = createWorthOnboarding({
          apiBaseUrl: ORIGIN,
          inviteToken,
          onStepSubmit: (event) => {
            console.log('SDK 3 step submitted', event);
          },
          onComplete: (event) => {
            console.log('SDK 3 onboarding completed', event);
            enqueueSnackbar('SDK 3 onboarding completed.', {
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
              variant: 'success',
            });
          },
          onError: (error) => {
            reportError(error);
          },
        });

        onboardingRef.current = onboarding;
        await onboarding.mount(mountRef.current!);
      } catch (error) {
        reportError(error);
        onboarding?.unmount();
        if (onboardingRef.current === onboarding) {
          onboardingRef.current = null;
        }
      }
    };

    void mountSdk();

    return () => {
      isActive = false;
      onboarding?.unmount();
      if (onboardingRef.current === onboarding) {
        onboardingRef.current = null;
      }
    };
  }, [enqueueSnackbar, inviteToken, navigate]);

  return (
    <div className="flex flex-col items-center self-center w-full bg-white py-12">
      {mountError && (
        <div className="w-4xl mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {mountError}
        </div>
      )}
      <div ref={mountRef} className="w-4xl min-h-[700px] bg-white" />
    </div>
  );
};

export default OnboardingSdk3;
