const customCss = `
    body,
    #plaid-link-iframe-1,
    #plaid-link-iframe-2 {
      background-color: white !important;
    }
  `;

const codeSnippet = `
  import {
    createOnboardingApp,
    type StageNavigation,
  } from '@worthai/onboarding-sdk';

  const ref = useRef<HTMLDivElement>(null);
  const { token } = useContext(AppContext);

  const onboardingApp = useMemo(
    () =>
      createOnboardingApp({
        origin: 'https://app.dev.joinworth.com',
        inviteToken: token,
        mode: 'embedded',
      }),
    [token],
  );
  
  const handleBackButton = useCallback(() => {
    if (navigation?.isInitialStage) {
      navigate('/prefill-form');
    } else {
      onboardingApp.prev();
    }
  }, [navigation, onboardingApp, navigate]);

  const handleNextButton = useCallback(() => {
    if (navigation?.isLastStage) {
      setIsComplete(true);
    } else {
      onboardingApp.next();
    }
  }, [navigation, onboardingApp]);

  onboardingApp.setCustomCss(customCss);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Add the iframe to the container
    container.appendChild(onboardingApp.iframe);
    (container.children[0] as HTMLElement).style.minHeight = '700px';

    // Subscribe to the onboarding app events
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
        case 'ERROR': {
          // This is a placeholder for the error message. In production, you should handle the error appropriately.
          console.error(event.data.payload.error.message);
          setLoading(false);
          break;
        }
        case 'STAGE_NAVIGATION':
          setNavigation(event.data.payload.stageNavigation);
          break;
        default:
          break;
      }
    });

    // Unsubscribe from the onboarding app events and remove the iframe from the container
    return () => {
      if (container && container.contains(onboardingApp.iframe)) {
        container.removeChild(onboardingApp.iframe);
      }
      subscription.unsubscribe();
      onboardingApp.cleanup();
    };
  }, [onboardingApp]);
  `;
const cssSnippet = `
  const customCss = \`
  ${customCss}
  \`
`;
export { codeSnippet, cssSnippet, customCss };
