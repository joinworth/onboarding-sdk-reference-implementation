import {
  createWorthOnboarding,
  isPostSignalFailedError,
  WorthOnboardingInboundSignal,
  type WorthOnboarding,
} from '@worthai/onboarding-sdk';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { SDK3_API_URL } from '@/constants/urls';
import { useWorthContext } from '@/components/worth/useWorthContext';
import TermsModal from '@/components/onboarding/TermsModal';
import {
  AGREEMENTS,
  type AgreementLinkType,
} from '@/components/onboarding/agreements';
import { createOnboardingSignalHandler } from './OnboardingSignalHandler';

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
  // Open while non-null. `linkType` picks the agreement; `fieldId` is the template field acceptance is written to.
  const [termsModal, setTermsModal] = useState<{
    linkType: AgreementLinkType;
    fieldId?: string;
  } | null>(null);
  // Acceptance per field, as last sent to the form, so reopening the modal shows it.
  const [acceptedTerms, setAcceptedTerms] = useState<Record<string, boolean>>(
    {},
  );

  const inviteToken = useMemo(
    () => onboardingInviteToken.trim(),
    [onboardingInviteToken],
  );

  const handleTermsAcceptedChange = (fieldId: string, accepted: boolean) => {
    setAcceptedTerms((current) => ({ ...current, [fieldId]: accepted }));
    // Writes the template's terms checkbox on the step the applicant is on.
    // A rejected post reaches `onError` below; it never throws here.
    onboardingRef.current?.postSignal(
      WorthOnboardingInboundSignal.SET_FIELD_VALUES,
      { values: { [fieldId]: accepted } },
    );
  };

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
            if (isPostSignalFailedError(error)) {
              // The flow is still mounted: a rejected post is a template or
              // host bug to fix, not a mount failure.
              const { reason, rejections = [] } = error.details;
              console.warn(
                'Onboarding rejected a posted signal',
                error.details,
              );
              enqueueSnackbar(`Onboarding rejected the update: ${reason}`, {
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'warning',
              });
              // Nothing was written, so stop showing the refused fields as accepted.
              setAcceptedTerms((current) => {
                const next = { ...current };
                for (const { fieldId } of rejections) {
                  delete next[fieldId];
                }
                return next;
              });
              return;
            }

            reportError(error);
          },
          onSignal: createOnboardingSignalHandler({
            openTermsModal: (linkType, fieldId) =>
              setTermsModal({ linkType, fieldId }),
          }),
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

  const termsFieldId = termsModal?.fieldId;

  return (
    <div className="flex flex-col items-center self-center w-full bg-white sm:py-12">
      {mountError && (
        <div className="w-full max-w-4xl px-4 mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {mountError}
        </div>
      )}
      <div
        ref={mountRef}
        className="w-full max-w-4xl sm:px-4 min-h-125 sm:min-h-175 bg-white"
      />
      {termsModal && (
        <TermsModal
          agreement={AGREEMENTS[termsModal.linkType]}
          accepted={
            termsFieldId !== undefined && (acceptedTerms[termsFieldId] ?? false)
          }
          onAcceptedChange={
            termsFieldId === undefined
              ? undefined
              : (accepted) => handleTermsAcceptedChange(termsFieldId, accepted)
          }
          onClose={() => setTermsModal(null)}
        />
      )}
    </div>
  );
};

export default OnboardingSdk3;
