# Onboarding SDK Reference Implementation

This repository serves as a reference implementation for integrating the [@worthai/onboarding-sdk](https://www.npmjs.com/package/@worthai/onboarding-sdk) into a React application. It demonstrates best practices for embedding the onboarding flow, handling events, managing navigation, and customizing the UI.

## Overview

This reference implementation showcases how to:

- Initialize and embed the onboarding SDK
- Handle SDK events (authentication, navigation, etc.)
- Control onboarding flow programmatically (next, previous, skip)
- Apply custom CSS styling to match your brand
- Manage loading states during authentication
- Integrate with React Router for navigation

## Prerequisites

- Node.js 18+ and npm
- A valid invite token from Worth AI
- Access to the Worth AI onboarding environment

## Installation

1. Clone this repository:
```bash
git clone https://github.com/your-org/onboarding-sdk-reference-implementation.git
cd onboarding-sdk-reference-implementation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
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

const onboardingApp = createOnboardingApp({
  origin: 'https://app.dev.joinworth.com', // Your Worth AI environment URL
  inviteToken: token, // Invite token from your backend
  mode: 'embedded', // Embed mode for iframe integration
});
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
- `AUTHENTICATION_FAILED`: Fired when authentication fails
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

```
src/
├── pages/
│   ├── Onboarding.tsx      # Main SDK integration example
│   ├── PrefillForm.tsx     # Example form for token generation
│   └── Landing.tsx         # Landing page
├── components/
│   ├── onboarding/
│   │   ├── constants.ts    # SDK configuration and CSS
│   │   └── Loading.tsx     # Loading component
│   └── ...
├── context/
│   └── app.tsx             # App context for token management
└── router/
    └── index.tsx           # React Router configuration
```

## Configuration

### Environment Variables

You may want to configure the following:

- **Origin URL**: Update the `origin` parameter in `createOnboardingApp` to point to your environment
- **Invite Token**: Obtain from your backend API (see `src/services/token.ts` for reference)

### Customization

1. **Styling**: Modify `src/components/onboarding/constants.ts` to customize the CSS
2. **Navigation**: Customize the navigation buttons in `src/pages/Onboarding.tsx`
3. **Loading States**: Adjust the loading component in `src/components/onboarding/Loading.tsx`

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
- Custom styling
- Cleanup on unmount

### Token Management

The reference implementation includes a token management example in `src/services/token.ts`. In production, you should:

1. Generate tokens server-side
2. Securely pass tokens to your frontend
3. Store tokens appropriately (context, state, etc.)

## Troubleshooting

### Common Issues

1. **Iframe not loading**: Ensure your `origin` URL is correct and accessible
2. **Authentication failing**: Verify your `inviteToken` is valid and not expired
3. **Navigation buttons not working**: Check that you're subscribed to `STAGE_NAVIGATION` events
4. **Styling not applying**: Ensure `setCustomCss` is called after creating the app instance

## Contributing

This is a reference implementation. Feel free to:

- Report issues
- Suggest improvements
- Submit pull requests

## License

[Add your license here]

## Support

For SDK-specific questions, please refer to the [@worthai/onboarding-sdk](https://www.npmjs.com/package/@worthai/onboarding-sdk) documentation or contact Worth AI support.

---

**Note**: This is a reference implementation. Adapt the code to fit your specific use case and security requirements.
