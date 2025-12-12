# Onboarding SDK Reference Implementation

This repository serves as a reference implementation for integrating the [@worthai/onboarding-sdk](https://www.npmjs.com/package/@worthai/onboarding-sdk) into a React application. It demonstrates best practices for embedding the onboarding flow, handling events, managing navigation, and customizing the UI.

## Overview

This reference implementation showcases how to:

- Build a complete onboarding flow with a landing page and prefill form
- Generate invitation tokens from form data
- Initialize and embed the onboarding SDK
- Handle SDK events (authentication, navigation, completion, etc.)
- Control onboarding flow programmatically (next, previous, skip)
- Apply custom CSS styling to match your brand
- Manage loading states during authentication
- Display success message when onboarding completes
- Integrate with React Router for navigation

## Prerequisites

- Node.js 18+ and npm
- A valid invite token from Worth AI
- Access to the Worth AI onboarding environment

## Installation

1. Clone this repository:

```bash
git clone https://github.com/joinworth/onboarding-sdk-reference-implementation.git
cd onboarding-sdk-reference-implementation
```

1. Install dependencies:

```bash
npm install
```

1. Start the development server:

```bash
npm run dev
```

## SDK Integration

### Basic Setup

The SDK is integrated in the `Onboarding` component (`src/pages/Onboarding.tsx`). Here's how it works:

#### 1. Install the SDK

```bash
npm install @worthai/onboarding-sdk
```

#### 2. Initialize the Onboarding App

```typescript
import {
  createOnboardingApp,
  type StageNavigation,
} from '@worthai/onboarding-sdk';
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
  };
}, [onboardingApp]);
```

### Key Features

#### Event Handling

The SDK emits various events that you can subscribe to:

- `AUTHENTICATING`: Fired when authentication starts
- `ONBOARDING_STARTED`: Fired when onboarding begins
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

**Note**: Navigation buttons are automatically hidden when the onboarding is loading or completed.

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
│   └── Onboarding.tsx      # Main SDK integration example
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
3. **Onboarding** (`/onboarding`) - Embedded SDK flow using the generated token
   - Shows loading state during authentication
   - Displays the onboarding iframe during the flow
   - Shows success message when the process completes
   - Hides navigation buttons when loading or completed

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

- **Origin URL**: Update the `origin` parameter in `createOnboardingApp` to point to your environment
- **API URL**: Update the API endpoint in `src/services/token.ts` (currently `https://api-dev.joinworth.ai`)
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

- `createOnboardingApp(config)`: Creates a new onboarding app instance
- `onboardingApp.subscribe(callback)`: Subscribe to SDK events
- `onboardingApp.next()`: Navigate to next stage
- `onboardingApp.prev()`: Navigate to previous stage
- `onboardingApp.skip()`: Skip current stage
- `onboardingApp.setCustomCss(css)`: Apply custom CSS styles

## Examples

### Complete Integration Example

See `src/pages/Onboarding.tsx` for a complete working example that includes:

- SDK initialization
- Event subscription
- Navigation controls
- Loading state management
- Success message display
- Iframe hiding on completion
- Custom styling
- Cleanup on unmount

### Token Management

The reference implementation includes a token generation and storage service in `src/services/token.ts` that:

- Accepts prefill form data
- Sends a POST request to the API endpoint
- Returns an invitation token
- Provides functions to save, retrieve, and remove tokens from localStorage:
  - `getToken(formData)`: Generates a token from form data
  - `saveTokenToStorage(token)`: Saves token to localStorage
  - `getTokenFromStorage()`: Retrieves token from localStorage
  - `removeTokenFromStorage()`: Removes token from localStorage

The token is retrieved from localStorage in the Onboarding component and passed to the onboarding SDK.

**Note**: In production, you should:

1. Generate tokens server-side for security
2. Securely pass tokens to your frontend
3. Store tokens appropriately (consider using secure storage mechanisms)
4. Implement proper error handling and token validation

## Troubleshooting

### Common Issues

1. **Iframe not loading**: Ensure your `origin` URL is correct and accessible
2. **Authentication failing**: Verify your `inviteToken` is valid and not expired. Check the `ERROR` event for specific error messages
3. **Navigation buttons not working**: Check that you're subscribed to `STAGE_NAVIGATION` events
4. **Styling not applying**: Ensure `setCustomCss` is called after creating the app instance
5. **Token not found**: Ensure the token is saved to localStorage before navigating to the onboarding page

## Contributing

This is a reference implementation. Feel free to:

- Report issues
- Suggest improvements
- Submit pull requests

## Support

For SDK-specific questions, please refer to the [@worthai/onboarding-sdk](https://www.npmjs.com/package/@worthai/onboarding-sdk) documentation or contact Worth AI support.

---

**Note**: This is a reference implementation. Adapt the code to fit your specific use case and security requirements.
