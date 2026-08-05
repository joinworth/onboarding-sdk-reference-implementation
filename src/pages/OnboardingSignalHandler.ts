import { WorthOnboardingLifecycleSignal, type WorthOnboardingSignalName } from "@worthai/onboarding-sdk";
import { enqueueSnackbar } from "notistack";

/**
 * Stands in for a customer host on the local dev route, where there is no host to supply `onSignal`.
 * Shaped like the handler a consumer would write — see `actions/EventSignal.README.md`.
 */
export function handleSignal(name: WorthOnboardingSignalName, payload: Record<string, unknown>): void {
  switch (name) {
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
      // Authored. `linkType` selects which host-owned modal to open.
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
}