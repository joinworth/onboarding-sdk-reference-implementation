import type { PrefillFormData } from '@/types/prefill';
interface OnboardResponse {
  invitation_token: string;
}

/**
 * Generates a token by submitting the onboarding form data
 * @param formData - The form data from PrefillForm
 * @returns A promise that resolves to the token string
 * @throws Error if the request fails
 */
export async function getToken(formData: PrefillFormData): Promise<string> {
  const apiUrl = 'https://api-dev.joinworth.ai';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Failed to generate token: ${response.status} ${response.statusText}`,
      );
    }

    const data: OnboardResponse = await response.json();
    return data.invitation_token;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while generating the token');
  }
}
