# Onboarding SDK Reference Implementation

This repository serves as a reference implementation for integrating the
[@worthai/onboarding-sdk](https://www.npmjs.com/package/@worthai/onboarding-sdk)
into a React application. It now demonstrates both the SDK 2 iframe integration
and the SDK 3 embedded runtime package contract produced by
`onboarding-application`.

## Overview

This reference implementation showcases how to:

- Build a complete onboarding flow with a landing page and prefill form
- Generate invitation tokens from form data
- Preserve the SDK 2 iframe example for migration and parity comparison
- Initialize and mount SDK 3 from `@worthai/onboarding-sdk`
- Handle SDK 3 lifecycle callbacks (`onStepSubmit`, `onComplete`, `onError`)
- Start SDK 3 from an invite-token interstitial and render a clean embedded view
- Manage loading states during authentication
- Display success message when onboarding completes
- Integrate with React Router for navigation

## Prerequisites

- Node.js and npm for the reference app
- Node.js `>=24 <25` and pnpm for building SDK 3 in `onboarding-application`
- A valid invite token from Worth AI for full runtime smoke tests
- Access to the Worth AI onboarding API environment

## Installation

1. Install dependencies in this reference app:

```bash
cd /Users/johnhalbert/src/github.com/joinworth/get-started/worth-sdk/onboarding-sdk-reference-implementation
npm install
```

The SDK 3 package is published to GitHub Packages. If your npm config does not
already authenticate to `npm.pkg.github.com`, configure the `@joinworth` scope
before installing:

```bash
@joinworth:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

For local package development against a sibling `onboarding-application`
checkout, build SDK 3 there first and temporarily point the dependency at the
local package:

```bash
cd /Users/johnhalbert/src/github.com/joinworth/onboarding-application
pnpm install
pnpm run test:sdk-package
```

1. Start the development server:

```bash
npm run dev
```

The reference app keeps the customer-facing SDK 3 import name
`@worthai/onboarding-sdk`, but resolves it through an npm alias to the GitHub
Package `@joinworth/onboarding-sdk`.

## SDK 2 And SDK 3 Side By Side

Both SDK generations use the package name `@worthai/onboarding-sdk`, but a single
app can resolve only one dependency for that package name. This reference app
therefore keeps SDK 3 on the customer-facing import:

```typescript
import { createWorthOnboarding } from '@worthai/onboarding-sdk';
```

The preserved SDK 2 iframe example uses an npm alias:

```typescript
import { createOnboardingApp } from '@worthai/onboarding-sdk-v2';
```

This allows SDK 2 and SDK 3 examples to run side by side in the same React app.

## SDK Integration

### SDK 3 Embedded Runtime

SDK 3 is demonstrated through `src/components/demo-flows/UseTokenSdk3.tsx`
and `src/pages/OnboardingSdk3.tsx`. The demo starts at
`/demo-flows/use-token-sdk-3`, stores the invite token in `WorthProvider`, then
navigates to `/onboarding-sdk-3` for a clean embedded SDK view.

The dedicated SDK 3 page imports from the package contract:

```typescript
import { createWorthOnboarding } from '@worthai/onboarding-sdk';
```

The SDK 3 lifecycle is DOM-first:

```typescript
const onboarding = createWorthOnboarding({
  apiBaseUrl: 'https://api-dev.joinworth.ai',
  inviteToken,
  onStepSubmit: ({ inviteToken, stepId, values }) => {
    console.log('Step submitted', { inviteToken, stepId, values });
  },
  onComplete: ({ inviteToken, values }) => {
    console.log('Onboarding completed', { inviteToken, values });
  },
  onError: (error) => {
    console.error(error);
  },
});

await onboarding.mount('#worth-onboarding');

// Later, for route cleanup:
onboarding.unmount();
```

SDK 3 validates `inviteToken` during construction, so the token interstitial
trims and stores a non-empty token before navigating to the SDK view. Direct
visits to `/onboarding-sdk-3` without a token redirect back to the SDK 3 token
interstitial. `mount()` is async and can reject, so the example catches mount
failures while still keeping the visible SDK route free of host debug controls.

SDK 3 also ships a browser-global build at
`dist-sdk/sdk3/worthai-onboarding-sdk.global.js`. When loaded directly in a
browser page, use the global namespace configured by the SDK build:

```html
<script src="/path/to/worthai-onboarding-sdk.global.js"></script>
<script>
  const onboarding = WorthAI.createWorthOnboarding({
    inviteToken: 'INVITE_TOKEN',
    onStepSubmit: (event) => console.log(event),
    onComplete: (event) => console.log(event),
    onError: (error) => console.error(error),
  });

  onboarding.mount('#worth-onboarding');
</script>
```

SDK 3 supports optional `flowInput` in the public options type. This reference
route intentionally omits it because the demo flows are selected through invite
tokens and this app does not contain a customer-ready static flow fixture.

### SDK 2 Iframe Example

The SDK 2 iframe flow is preserved in `src/pages/Onboarding.tsx` at
`/onboarding`. Here's how it works:

#### 1. Install the SDK

```bash
npm install @worthai/onboarding-sdk-v2@npm:@worthai/onboarding-sdk@2.0.17
```

#### 2. Initialize the Onboarding App

```typescript
import {
  createOnboardingApp,
  type StageNavigation,
} from '@worthai/onboarding-sdk-v2';
import { getTokenFromStorage } from '@/services/token';

const token = getTokenFromStorage() || ''; // Retrieve token from localStorage

const onboardingApp = useMemo(
  () =>
    createOnboardingApp({
      origin: 'https://app.dev.joinworth.com', // Your Worth AI environment URL
      inviteToken: token, // Invite token from localStorage or backend
      mode: 'embedded', // Embed mode for iframe integration
    }),
  [token],
);

onboardingApp.setCustomCss(customCss); // Apply custom CSS
```

#### 3. Mount the Iframe

```typescript
useEffect(() => {
  const container = ref.current;
  if (!container) return;

  // Append the iframe to your container
  container.appendChild(onboardingApp.iframe);
  (container.children[0] as HTMLElement).style.minHeight = '700px';

  // Subscribe to events
  const subscription = onboardingApp.subscribe((event) => {
    switch (event.data.type) {
      case 'AUTHENTICATING':
        setLoading(true);
        break;
      case 'ONBOARDING_STARTED':
        setLoading(false);
        break;
      case 'ERROR': {
        const error = event.data.payload.error;
        let message = '';

        if (error instanceof Error) {
          message = error.message;
        } else {
          message = (error as { message?: string })?.message ?? String(error);
        }
        console.error(message);
        setLoading(false);
        break;
      }
      case 'ROUTE_URL': {
        console.log('Current onboarding app url: ', event.data.payload.url);
        break;
      }
      case 'STAGE_NAVIGATION':
        setNavigation(event.data.payload.stageNavigation);
        break;
      default:
        break;
    }
  });

  // Cleanup on unmount
  return () => {
    if (container && container.contains(onboardingApp.iframe)) {
      container.removeChild(onboardingApp.iframe);
    }
    subscription.unsubscribe();
    onboardingApp.cleanup();
  };
}, [onboardingApp]);
```

### Key Features

#### Event Handling

The SDK emits various events that you can subscribe to:

- `AUTHENTICATING`: Fired when authentication starts
- `ONBOARDING_STARTED`: Fired when onboarding begins
- `ROUTE_URL`: Fired when the onboarding app URL changes (useful for tracking navigation)
- `ERROR`: Fired when an error occurs (including authentication failures)
- `STAGE_NAVIGATION`: Fired when navigation state changes (enables/disables buttons)

#### Programmatic Navigation

Control the onboarding flow from your application:

```typescript
// Navigate to next stage
onboardingApp.next();

// Navigate to previous stage
onboardingApp.prev();

// Skip current stage
onboardingApp.skip();
```

The navigation state is available through the `STAGE_NAVIGATION` event, which provides:

- `prevStatus`: Previous button state (disabled/enabled)
- `nextStatus`: Next button state (disabled/enabled, visible, isSubmit)
- `skipStatus`: Skip button state (disabled/enabled)
- `isInitialStage`: Boolean indicating if the user is on the first stage
- `isLastStage`: Boolean indicating if the user is on the final stage

**Note**: Navigation buttons are automatically hidden when the onboarding is loading or completed. The implementation handles navigation intelligently:

- Back button navigates to the prefill form when on the initial stage
- Next button triggers completion when on the last stage

#### Custom Styling

Apply custom CSS to match your brand:

```typescript
const customCss = `
  /* Your custom styles */
  .onboarding-container {
    /* ... */
  }
`;

onboardingApp.setCustomCss(customCss);
```

See `src/components/onboarding/constants.ts` for a complete example of custom CSS styling.

## Project Structure

```text
src/
├── pages/
│   ├── Landing.tsx         # Landing page with features showcase
│   ├── PrefillForm.tsx     # Form for collecting onboarding data
│   ├── Onboarding.tsx      # SDK 2 iframe integration example
│   └── OnboardingSdk3.tsx  # SDK 3 embedded runtime example
├── components/
│   ├── header/
│   │   ├── Header.tsx      # Navigation header component
│   │   └── Header.css      # Header styles
│   ├── landing/
│   │   ├── Headline.tsx    # Landing page headline section
│   │   └── Features.tsx    # Features showcase section
│   ├── onboarding/
│   │   ├── constants.ts    # SDK configuration and CSS
│   │   ├── Loading.tsx     # Loading component
│   │   └── Success.tsx     # Success component shown on completion
│   ├── prefill/
│   │   ├── BusinessInfo.tsx    # Business information form fields
│   │   ├── OwnerInfo.tsx       # Owner information form fields
│   │   ├── ApplicantInfo.tsx   # Applicant information form fields
│   │   ├── FormSection.tsx     # Reusable form section wrapper
│   │   ├── FormField.tsx       # Reusable form field component
│   │   ├── constants.ts        # Form constants and initial data
│   │   └── utils.ts            # Form utility functions
│   └── ScrollToTop.tsx     # Scroll to top component
├── services/
│   └── token.ts            # Token generation and storage service
├── types/
│   └── prefill.ts          # TypeScript types for prefill form
└── router/
    └── index.tsx           # React Router configuration
```

## Application Flow

The application follows this flow:

1. **Landing Page** (`/`) - Welcome page with features and call-to-action
2. **Prefill Form** (`/prefill-form`) - Collect business, owner, and applicant information
3. **Demo Flows** (`/demo-flows`) - Generate or paste invite tokens
4. **SDK 2 Onboarding** (`/onboarding`) - Iframe SDK flow using the generated token
   - Shows loading state during authentication
   - Displays the onboarding iframe during the flow
   - Shows success message when the process completes
   - Hides navigation buttons when loading or completed
   - Provides toggle buttons to show/hide iframe border, code snippet, and CSS snippet
   - Handles intelligent navigation (back to prefill form on initial stage, completion on last stage)
5. **SDK 3 Token Entry** (`/demo-flows/use-token-sdk-3`) - Invite-token interstitial for the SDK 3 flow
   - Trims and stores the invite token in session-backed context
   - Navigates to the dedicated SDK 3 view
6. **SDK 3 Onboarding** (`/onboarding-sdk-3`) - Embedded runtime package demo
   - Auto-mounts SDK 3 using the stored invite token
   - Redirects back to token entry when no token is available
   - Keeps host debug controls off the SDK view so the flow feels closer to production

### Landing Page

The landing page (`src/pages/Landing.tsx`) showcases the application with:

- Hero headline section
- Features showcase
- Call-to-action buttons to start the demo

### Prefill Form

The prefill form (`src/pages/PrefillForm.tsx`) collects:

- Business information (name, EIN, industry, etc.)
- Owner information (name, email, phone, SSN, etc.)
- Applicant information (name, email, phone, address, etc.)

Upon submission, the form:

1. Sends data to the API endpoint
2. Receives an invitation token
3. Stores the token in localStorage
4. Navigates to the onboarding page

## Configuration

### Environment Variables

You may want to configure the following:

- **Origin URL**: Update the `origin` parameter in `createOnboardingApp` to point SDK 2 to your environment
- **API URL**: Set `VITE_API_URL` for token generation and the SDK 2 reference API (default `https://api-dev.joinworth.ai`)
- **SDK 3 API URL**: Set `VITE_SDK3_API_URL` for SDK 3 `apiBaseUrl` when it should use a different backend host. If omitted, SDK 3 falls back to `VITE_API_URL`.
- **Invite Token**: Automatically generated from the prefill form, or obtain from your backend API

### Customization

1. **Styling**: Modify `src/components/onboarding/constants.ts` to customize the CSS
2. **Navigation**: Customize the navigation buttons in `src/pages/Onboarding.tsx`
3. **Loading States**: Adjust the loading component in `src/components/onboarding/Loading.tsx`
4. **Success Message**: Customize the completion message in `src/components/onboarding/Success.tsx`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## SDK API Reference

For complete API documentation, refer to the [@worthai/onboarding-sdk](https://www.npmjs.com/package/@worthai/onboarding-sdk) package documentation.

### Main Methods

SDK 3:

- `createWorthOnboarding(options)`: Creates an SDK 3 onboarding instance
- `onboarding.mount(target)`: Mounts the embedded runtime into a DOM target
- `onboarding.unmount()`: Tears down the embedded runtime for route cleanup
- `onStepSubmit(event)`: Observes submitted step payloads
- `onComplete(event)`: Observes completed onboarding flows
- `onError(error)`: Observes SDK/runtime errors

SDK 2:

- `createOnboardingApp(config)`: Creates a new onboarding app instance
- `onboardingApp.subscribe(callback)`: Subscribe to SDK events
- `onboardingApp.next()`: Navigate to next stage
- `onboardingApp.prev()`: Navigate to previous stage
- `onboardingApp.skip()`: Skip current stage
- `onboardingApp.setCustomCss(css)`: Apply custom CSS styles
- `onboardingApp.cleanup()`: Clean up resources when unmounting (should be called in useEffect cleanup)

## Examples

### Complete Integration Example

See `src/pages/OnboardingSdk3.tsx` for the SDK 3 package-contract example that includes:

- ESM import from `@worthai/onboarding-sdk`
- Auto-mounting from the token captured by `src/components/demo-flows/UseTokenSdk3.tsx`
- `onStepSubmit`, `onComplete`, and `onError` callbacks
- Cleanup when the React route unmounts

See `src/pages/Onboarding.tsx` for the preserved SDK 2 iframe example that includes:

- SDK initialization
- Event subscription (including `ROUTE_URL` event)
- Navigation controls with intelligent stage handling
- Loading state management
- Success message display
- Iframe hiding on completion
- Toggle buttons for iframe border, code snippet, and CSS snippet display
- Custom styling
- Proper cleanup on unmount (including `cleanup()` method call)

### Token Management

The reference implementation includes a token generation and storage service in `src/services/token.ts` that:

- Accepts prefill form data
- Sends a POST request to the API endpoint
- Returns an invitation token
- Provides functions to save, retrieve, and remove tokens:
  - `getToken(formData)`: Generates a token from form data
  - `saveTokenToStorage(token)`: Saves token to localStorage
  - `getTokenFromStorage()`: Retrieves token from localStorage
  - `removeTokenFromStorage()`: Removes token from localStorage

The token is stored in session storage by `WorthProvider`, then passed to either
the SDK 2 iframe example or the SDK 3 embedded runtime example.

**Note**: In production, you should:

1. Generate tokens server-side for security
2. Securely pass tokens to your frontend
3. Store tokens appropriately (consider using secure storage mechanisms)
4. Implement proper error handling and token validation

## Troubleshooting

### Common Issues

1. **SDK 3 package does not resolve**: Build SDK 3 in `onboarding-application` before installing this app
2. **SDK 3 route redirects to token entry**: Paste an invite token in `/demo-flows/use-token-sdk-3` or start from a demo flow that generates one
3. **SDK 3 mount fails**: Verify `VITE_SDK3_API_URL` points to the Worth API environment that issued the invite token. If `VITE_SDK3_API_URL` is omitted, SDK 3 uses `VITE_API_URL`.
4. **Iframe not loading**: Ensure your SDK 2 `origin` URL is correct and accessible
5. **Authentication failing**: Verify your `inviteToken` is valid and not expired. Check `onError` for SDK 3 or the `ERROR` event for SDK 2
6. **SDK 2 navigation buttons not working**: Check that you're subscribed to `STAGE_NAVIGATION` events and that navigation state is properly set
7. **SDK 2 styling not applying**: Ensure `setCustomCss` is called after creating the app instance
8. **Memory leaks**: Make sure SDK 3 calls `unmount()` and SDK 2 calls `cleanup()` during route cleanup

## Contributing

This is a reference implementation. Feel free to:

- Report issues
- Suggest improvements
- Submit pull requests

## Support

For SDK-specific questions, please refer to the [@worthai/onboarding-sdk](https://www.npmjs.com/package/@worthai/onboarding-sdk) documentation or contact Worth AI support.

---

**Note**: This is a reference implementation. Adapt the code to fit your specific use case and security requirements.
