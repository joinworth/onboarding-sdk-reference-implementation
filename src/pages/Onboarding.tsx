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
import {
  codeSnippet,
  cssSnippet,
  customCss,
} from '@/components/onboarding/constants';

const Onboarding = (): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const { token } = useContext(AppContext);
  const [navigation, setNavigation] = useState<StageNavigation>();
  const [isLoading, setLoading] = useState(true);
  const [showBorder, setShowBorder] = useState(false);
  const onboardingApp = useMemo(
    () =>
      createOnboardingApp({
        origin: 'https://app.dev.joinworth.com',
        inviteToken: token,
        mode: 'embedded',
      }),
    [token],
  );

  onboardingApp.setCustomCss(customCss);

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
    <div className="w-4xl flex flex-col items-center self-center gap-8">
      {isLoading ? <Loading /> : null}
      <div
        ref={ref}
        className={`w-full ${isLoading ? 'hidden' : ''} ${
          showBorder ? 'border-4 border-blue-400 rounded-lg' : ''
        }`}
      />
      <div className="flex w-full justify-between">
        <button
          onClick={() => setShowBorder(!showBorder)}
          className={`button-secondary-dark ${showBorder ? 'bg-blue-600' : ''}`}
          type="button"
        >
          {showBorder ? 'Hide iframe' : 'Show iframe'}
        </button>
        <div className="flex gap-4">
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
      <div className="w-full mb-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400 mb-2">SDK React Initialization:</p>
        <pre className="text-xs text-gray-300 overflow-x-auto">
          <code>{codeSnippet}</code>
        </pre>
      </div>
      <div className="w-full mb-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400 mb-2">Theme CSS:</p>
        <pre className="text-xs text-gray-300 overflow-x-auto">
          <code>{cssSnippet}</code>
        </pre>
      </div>
    </div>
  );
};

export default Onboarding;
