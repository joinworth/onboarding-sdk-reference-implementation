import type { PrefillFormData } from '@/types/prefill';
interface OnboardResponse {
  invitation_token: string;
}

const TOKEN_STORAGE_KEY = 'onboarding_token';

export function saveTokenToStorage(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}
export function getTokenFromStorage(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}
export function removeTokenFromStorage(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
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
      const error = new Error(
        errorData.message ||
          `Failed to generate token: ${response.status} ${response.statusText}`,
      );
      (error as Error & { status?: number }).status = response.status;
      throw error;
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
