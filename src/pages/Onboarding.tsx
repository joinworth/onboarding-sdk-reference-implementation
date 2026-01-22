import {
  createOnboardingApp,
  type StageNavigation,
} from '@worthai/onboarding-sdk';
import { useEffect, useMemo, useRef, useState } from 'react';
import Loading from '@/components/onboarding/Loading';
import Success from '@/components/onboarding/Success';
import {
  codeSnippet,
  cssSnippet,
  customCss,
} from '@/components/onboarding/constants';
import { useNavigate } from 'react-router';
import { useWorthContext } from '@/components/worth/useWorthContext';
import { ORIGIN } from '@/constants/urls';

const Onboarding = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { onboardingInviteToken } = useWorthContext();
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState<StageNavigation>();
  const [isLoading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  const [showCssSnippet, setShowCssSnippet] = useState(false);
  const onboardingApp = useMemo(
    () =>
      createOnboardingApp({
        origin: ORIGIN,
        inviteToken: onboardingInviteToken,
        mode: 'embedded',
      }),
    [],
  );

  const handleBackButton = () => {
    if (navigation?.isInitialStage) {
      navigate('/prefill-form');
    } else {
      onboardingApp.prev();
    }
  };

  const handleNextButton = () => {
    if (navigation?.isLastStage) {
      setIsComplete(true);
    } else {
      onboardingApp.next();
    }
  };

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
          setLoading(false);
          break;
        case 'ROUTE_URL': {
          console.log('Current onboarding app url: ', event.data.payload.url);
          break;
        }
        case 'IFRAME_INITIALIZED':
          onboardingApp.setCustomCss(
            customCss
          );
          break;
        case 'ERROR': {
          alert(event.data.payload.error.message);
          setLoading(false);
          break;
        }
        case 'STAGE_NAVIGATION':
          console.log('Stage navigation: ', event.data.payload.stageNavigation);
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
      onboardingApp.cleanup();
    };
  }, []);

  return (
    <div className="flex flex-col items-center self-center gap-4 w-full">
      <div className="flex flex-col items-center w-full bg-white py-12">
        <div className="w-4xl mb-8">
          <h1 className="text-4xl font-serif text-black mb-2">
            Onboarding Form Demo
          </h1>
          <p className="text-black/70">
            Check the iframe below to see the onboarding process.
          </p>
        </div>
        {isLoading ? <Loading /> : null}
        {isComplete ? <Success /> : null}
        <div
          ref={ref}
          className={`w-4xl ${isLoading || isComplete ? 'hidden' : ''} ${
            showBorder ? 'border-4 border-blue-400 rounded-lg' : ''
          }`}
        />
      </div>
      <div className="flex w-4xl justify-between pb-12">
        <div className="flex gap-4">
          <button
            onClick={() => setShowBorder(!showBorder)}
            className={`button-secondary-dark ${showBorder ? 'bg-blue-600' : ''}`}
            type="button"
          >
            {showBorder ? 'Hide iframe' : 'Show iframe'}
          </button>
          <button
            onClick={() => setShowCodeSnippet(!showCodeSnippet)}
            className={`button-secondary-dark ${showCodeSnippet ? 'bg-blue-600' : ''}`}
            type="button"
          >
            {showCodeSnippet ? 'Hide code snippet' : 'Show code snippet'}
          </button>
          <button
            onClick={() => setShowCssSnippet(!showCssSnippet)}
            className={`button-secondary-dark ${showCssSnippet ? 'bg-blue-600' : ''}`}
            type="button"
          >
            {showCssSnippet ? 'Hide CSS snippet' : 'Show CSS snippet'}
          </button>
        </div>
        {!isLoading && !isComplete && (
          <div className="flex gap-4">
            <button
              disabled={navigation?.prevStatus.disabled}
              onClick={handleBackButton}
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
                onClick={handleNextButton}
                className="button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {navigation?.nextStatus.isSubmit ? 'Submit' : 'Next'}
              </button>
            )}
          </div>
        )}
      </div>
      {showCodeSnippet && (
        <div className="w-4xl mb-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">
            SDK React Initialization:
          </p>
          <pre className="text-xs text-gray-300 overflow-x-auto">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      )}
      {showCssSnippet && (
        <div className="w-4xl mb-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400 mb-2">Theme CSS:</p>
          <pre className="text-xs text-gray-300 overflow-x-auto">
            <code>{cssSnippet}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
