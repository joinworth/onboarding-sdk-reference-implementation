import {
  WorthOnboardingLifecycleSignal,
  type WorthOnboardingSignalName,
} from '@worthai/onboarding-sdk';
import { enqueueSnackbar } from 'notistack';
import {
  isAgreementLinkType,
  type AgreementLinkType,
} from '@/components/onboarding/agreements';

/** Host-owned UI a signal can open. Each opener is React state the page owns. */
export interface OnboardingSignalHost {
  /**
   * Opens the terms modal on the agreement `linkType` names. `fieldId` is the
   * template field the modal writes acceptance back to with `postSignal`;
   * without one the agreement is read-only.
   */
  openTermsModal: (linkType: AgreementLinkType, fieldId?: string) => void;
}

/**
 * The `onSignal` handler a customer host would write. Payloads are literals the
 * template author wrote, so they are checked before use rather than trusted.
 * See `actions.README.md` in the onboarding-application repo.
 */
export const createOnboardingSignalHandler =
  (host: OnboardingSignalHost) =>
  (name: WorthOnboardingSignalName, payload: Record<string, unknown>): void => {
    switch (name) {
      case WorthOnboardingLifecycleSignal.STEP_READY:
        // The step now accepts `postSignal`. It re-fires after every submit attempt that keeps the applicant
        // on the step, so a host that prefills here must guard against posting twice.
        break;

      case WorthOnboardingLifecycleSignal.STEP_ENTERED:
        enqueueSnackbar(`Entered step ${payload.stepId}`, {
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'info',
        });
        break;

      case WorthOnboardingLifecycleSignal.STEP_SUBMITTED:
        enqueueSnackbar(`Submitted step ${payload.stepId}`, {
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'info',
        });
        break;

      case WorthOnboardingLifecycleSignal.APPLICATION_COMPLETED:
        // A real host would redirect, close its modal, or show its own summary screen here.
        enqueueSnackbar(`Application complete`, {
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'info',
        });
        break;

      case 'application-exited':
        // Authored, not lifecycle: the first step's Back button. A real host would confirm the exit.
        enqueueSnackbar(`Exited from ${payload.source}`, {
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'info',
        });
        break;

      case 'view-link':
        // Authored. `linkType` selects which host-owned agreement the modal shows.
        if (isAgreementLinkType(payload.linkType)) {
          // `fieldId` names the template's terms checkbox, so the template, not this host, decides which field
          // acceptance lands in.
          host.openTermsModal(
            payload.linkType,
            typeof payload.fieldId === 'string' ? payload.fieldId : undefined,
          );
          break;
        }

        enqueueSnackbar(`View link requested ${payload.linkType}`, {
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'info',
        });
        break;

      default:
        // Any other authored name. Authors add these without an SDK release.

        enqueueSnackbar(`Authored signal ${name}`, {
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'info',
        });
    }
  };
