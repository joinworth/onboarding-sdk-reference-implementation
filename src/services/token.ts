import { API_URL } from '@/constants/urls';
import type { PrefillFormData } from '@/types/prefill';
interface OnboardResponse {
  invitation_token: string;
}

export async function getToken({
  tin,
  ...formData
}: PrefillFormData): Promise<string> {
  const apiUrl = API_URL;
  const response = await fetch(`${apiUrl}/onboarding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ ...formData, ...(tin ? { tin } : {}) }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  const data: OnboardResponse = await response.json();
  return data.invitation_token;
}
