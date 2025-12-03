import { AppContext } from '@/context/app';
import {
  createOnboardingApp,
  type StageNavigation,
} from '@worthai/onboarding-sdk';
import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import Loading from '@/components/onboarding/Loading';

const Onboarding = (): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const { token } = useContext(AppContext);
  const [navigation, setNavigation] = useState<StageNavigation>();
  const [isLoading, setLoading] = useState(true);
  const onboardingApp = useMemo(
    () =>
      createOnboardingApp({
        origin: 'https://app.dev.joinworth.com',
        inviteToken: token,
        mode: 'embedded',
      }),
    [token],
  );

  onboardingApp.setCustomCss(
    `
    body {
      background-color: #112749;
    }
    p, div {
      color: white !important;
    }
    
    /* Text inputs and textarea */
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="number"],
    input[type="date"],
    input[type="password"],
    textarea {
      border-radius: 0.5rem;
      background-color: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white !important;
    }
    input[type="text"]::placeholder,
    input[type="email"]::placeholder,
    input[type="tel"]::placeholder,
    input[type="number"]::placeholder,
    input[type="date"]::placeholder,
    input[type="password"]::placeholder,
    textarea::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="tel"]:focus,
    input[type="number"]:focus,
    input[type="date"]:focus,
    input[type="password"]:focus,
    textarea:focus {
      outline: none;
      box-shadow: 0 0 0 2px #3b82f6;
      border-color: transparent;
    }
    
    /* Checkbox */
    input[type="checkbox"] {
      border-radius: 0.25rem;
      border: 1px solid #d1d5db;
      accent-color: #3b82f6;
    }
    input[type="checkbox"]:focus {
      outline: none;
      box-shadow: 0 0 0 2px #3b82f6;
    }
    
    /* Select and similar controls */
    select,
    .css-fz40lm-control,
    [data-qa="z2qik6z2qi"],
    [data-qa="idrli5idrl"],
    [data-qa="95eqes95eq"],
    [data-qa="urbmxeurbm"] {
      border-radius: 0.5rem;
      background-color: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white !important;
    }
    select:focus,
    .css-fz40lm-control:focus,
    .css-fz40lm-control:focus-within,
    [data-qa="z2qik6z2qi"]:focus,
    [data-qa="z2qik6z2qi"]:focus-within,
    [data-qa="idrli5idrl"]:focus,
    [data-qa="idrli5idrl"]:focus-within,
    [data-qa="95eqes95eq"]:focus,
    [data-qa="95eqes95eq"]:focus-within,
    [data-qa="urbmxeurbm"]:focus,
    [data-qa="urbmxeurbm"]:focus-within {
      outline: none;
      box-shadow: 0 0 0 2px #3b82f6;
      border-color: transparent;
    }
    select option {
      background-color: #112749;
      color: white !important;
    }
    
    /* Text elements */
    [data-qa="p14171p141"],
    [data-qa="iadi34iadi"] {
      color: white !important;
    }
    label {
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: white !important;
    }
  `,
  );

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.appendChild(onboardingApp.iframe);
    (container.children[0] as HTMLElement).style.minHeight = '700px';
    const subscription = onboardingApp.subscribe((event) => {
      switch (event.data.type) {
        case 'AUTHENTICATING':
          setLoading(true);
          break;
        case 'ONBOARDING_STARTED':
        case 'AUTHENTICATION_FAILED':
          setLoading(false);
          break;
        case 'STAGE_NAVIGATION':
          setNavigation(event.data.payload.stageNavigation);
          break;
        default:
          break;
      }
    });

    return () => {
      if (container && container.contains(onboardingApp.iframe)) {
        container.removeChild(onboardingApp.iframe);
      }
      subscription.unsubscribe();
    };
  }, [onboardingApp]);

  return (
    <div className="flex flex-col flex-1 bg-blue-950 items-center">
      {isLoading ? <Loading /> : null}
      <div ref={ref} className={`w-7xl ${isLoading ? 'hidden' : ''}`} />
      <div className="flex gap-4 justify-center p-4 bg-blue-950">
        <button
          disabled={navigation?.prevStatus.disabled}
          onClick={() => onboardingApp.prev()}
          className="button-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          disabled={navigation?.skipStatus.disabled}
          onClick={() => onboardingApp.skip()}
          className="button-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Skip
        </button>
        {navigation?.nextStatus.visible && (
          <button
            disabled={navigation?.nextStatus.disabled}
            onClick={() => onboardingApp.next()}
            className="button-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {navigation?.nextStatus.isSubmit ? 'Submit' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
