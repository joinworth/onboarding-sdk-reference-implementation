import {
  createWorthOnboarding,
  type WorthOnboarding,
} from '@worthai/onboarding-sdk';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import Success from '@/components/onboarding/Success';
import { SDK3_API_URL } from '@/constants/urls';
import { useWorthContext } from '@/components/worth/useWorthContext';
import { handleOnboardingSignal } from './OnboardingSignalHandler';

/**
 * Authored by the IDV Quick Add template when the identity verification session ends (payload
 * `{ result: 'pass' | 'fail' }`). Like SDK 2's IDENTITY_VERIFICATION_PASS/FAIL_SESSION detached events,
 * either result ends the flow here.
 */
const IDV_COMPLETED_SIGNAL = 'identity-verification-completed';

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
  const [isComplete, setIsComplete] = useState(false);

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
          apiBaseUrl: SDK3_API_URL,
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
          onSignal: (name, payload) => {
            if (name !== IDV_COMPLETED_SIGNAL) {
              handleOnboardingSignal(name, payload);
              return;
            }
            console.log('SDK 3 identity verification ended', payload);
            setIsComplete(true);
            // Unmount after the SDK's action run returns, not from inside its own callback.
            setTimeout(() => {
              onboarding?.unmount();
              if (onboardingRef.current === onboarding) {
                onboardingRef.current = null;
              }
            });
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
    <div className="flex flex-col items-center self-center w-full bg-white sm:py-12">
      {mountError && (
        <div className="w-full max-w-4xl px-4 mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {mountError}
        </div>
      )}
      {isComplete ? <Success /> : null}
      <div
        ref={mountRef}
        className={`w-full max-w-4xl sm:px-4 min-h-125 sm:min-h-175 bg-white ${isComplete ? 'hidden' : ''}`}
      />
    </div>
  );
};

export default OnboardingSdk3;
