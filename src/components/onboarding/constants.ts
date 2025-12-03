const customCss = `
    body,
    [role="dialog"] {
      background-color: #112749 !important;
    }
      
    button,
    [role="menu"] {
      background-color: #112749E6 !important;
    }
    
    p, div, button, h2, h3, svg {
      color: white !important;
    }
    
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
    
    input[type="checkbox"] {
      border-radius: 0.25rem;
      border: 1px solid #d1d5db;
      accent-color: #3b82f6;
    }
    input[type="checkbox"]:focus {
      outline: none;
      box-shadow: 0 0 0 2px #3b82f6;
    }
    
    select,
    .css-fz40lm-control,
    .css-1y6znf3-option,
    [data-qa="z2qik6z2qi"],
    [data-qa="idrli5idrl"],
    [data-qa="95eqes95eq"],
    [data-qa="ob8fzdob8f"],
    [data-qa="5dvqto5dvq"],
    [data-qa="urbmxeurbm"],
    [data-qa="w18vipw18v"],
    [data-qa="fuvb17fuvb"],
    [data-qa="fe06xlfe06"],
    [data-qa="wj6om8wj6o"],
    [role="listbox"] {
      border-radius: 0.5rem;
      background-color: #112749 !important;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white !important;
    }
    select:focus,
    .css-fz40lm-control:focus,
    .css-fz40lm-control:focus-within,
    .css-1y6znf3-option:focus,
    .css-1y6znf3-option:focus-within,
    [data-qa="z2qik6z2qi"]:focus,
    [data-qa="z2qik6z2qi"]:focus-within,
    [data-qa="idrli5idrl"]:focus,
    [data-qa="idrli5idrl"]:focus-within,
    [data-qa="95eqes95eq"]:focus,
    [data-qa="95eqes95eq"]:focus-within,
    [data-qa="urbmxeurbm"]:focus,
    [data-qa="urbmxeurbm"]:focus-within,
    [data-qa="5dvqto5dvq"]:focus,
    [data-qa="5dvqto5dvq"]:focus-within,
    [data-qa="w18vipw18v"]:focus,
    [data-qa="w18vipw18v"]:focus-within,
    [data-qa="fuvb17fuvb"]:focus,
    [data-qa="fuvb17fuvb"]:focus-within {
      outline: none;
      box-shadow: 0 0 0 2px #3b82f6;
      border-color: transparent;
    }
    select option {
      background-color: #112749;
      color: white !important;
    }
    
    [data-qa="p14171p141"],
    [data-qa="iadi34iadi"] {
      color: white !important;
    }
    label {
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: white !important;
    }
  `;

const codeSnippet = `
  import {
    createOnboardingApp,
    type StageNavigation,
  } from '@worthai/onboarding-sdk';

  const ref = useRef<HTMLDivElement>(null);
  const onboardingApp = createOnboardingApp({
    origin: 'https://app.dev.joinworth.com',
    inviteToken: 'eyJhbGciOiJIUzI1NiJ9.VTJGc2RHVmtYMSs3STB2QW4wYjNHZTErN0lYTHNqeUQ2c3NlcW5jbUZEcU9MaHBvVy9MbHJHRll3a2Z2TzRVTVVMSXRSZUpXY2lwTC9FNTJDS0pDRXVVZWtIK3pSd0pHai84V0dFMEdUcWc0R3NjdUZSY3p6cTJYbEpmaXFpY0ZCbkZrMlVpQ0ZWY1IrS2RUaE43aFAvOXdMUm4wckZ3dklSNFFNUXJiWnNYdWRqQkFvVFNjY0Zzbm1yWER0czJEVHN1SjZ1MHlzL3o4NkZ0RFd3Ym90S29tN3VKT2tQemlQVC9WYnBMZ1htQUFaTTBueVJEMmtBOE1ORFJrR0lXQjVJSldVWmJseU1XSWVZdEZrZ3lGNGRXU3pxblc1YkNmb00zQU1abk8vT2tJbllwZDJrUGsxVUN5Qm5lRG1BTTRkQXhhY0F3djZrK09XU3YxbWJrKyt5VWlrZ1VhZW92Um5mVE1sNWU1em0yNkVvMDY4WTU0aGpsZysvdkxXZ1RrbG9pTzQzdDYzb0docytPeGEyRkh1eG8rNEN5OWdReWdGK3NuUzEwZXFWYmNyWE1yZmxGWjBvZ2cvWUxpYmgvRUpCbHpXblp0Y1pxMVZIUzlETFoxQzJXM2xvaHVmUWsrOW4veTNxZ0Q1Q1FWaUZPYWJTUXVjVGRHT2FvYlhlbVJDaDNMVUltYzFHSWZnaHFEc25tdS9hdTNONk9vamJDamN0QmZaUWNsODZOSjVCQUZFQnYxRy80cWhnL3ovdTFWelN4V2VtaFJVdlp1aUdwVkZFbDlNRDdEMTE2M3VjMTYzV0V1eTRmQ3N1QlJtWmN2N0FFTEZZdks1VzZjNlJZMU93a3BvTERzSHBlNmU2cGJDSmNFY2ZCcWluZU9pTUVKek1kT1dHMWE0WFZYbDBKVXZUTy9LMnpOdGFNR2s2TjE.3XooOZcgw-6u7eYyMJaCKxLfEbWhDldK15XOzfViF78',
    mode: 'embedded',
  });
  
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

    // Unsubscribe from the onboarding app events and remove the iframe from the container
    return () => {
      if (container && container.contains(onboardingApp.iframe)) {
        container.removeChild(onboardingApp.iframe);
      }
      subscription.unsubscribe();
    };
  }, [onboardingApp]);
  `;
const cssSnippet = `
  const customCss = \`
  ${customCss}
  \`
  onboardingApp.setCustomCss(customCss);
`;
export { codeSnippet, cssSnippet, customCss };
