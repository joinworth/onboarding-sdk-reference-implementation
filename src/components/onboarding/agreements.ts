/** A host-owned document the terms modal shows. */
export interface Agreement {
  title: string;
  paragraphs: string[];
}

/**
 * Documents a `view-link` signal can open, keyed by the `linkType` the template
 * author wrote. The host owns this content; the template only names which one
 * to show. Replace the sample copy with your own agreements.
 */
export const AGREEMENTS = {
  terms: {
    title: 'Terms and Conditions',
    paragraphs: [
      'These sample terms stand in for your own. Replace them with the agreement your applicants must accept before they submit.',
      'By accepting, the applicant confirms the information in this application is accurate and authorizes you to verify it.',
    ],
  },
  pricing: {
    title: 'Pricing Agreement',
    paragraphs: [
      'This sample pricing agreement stands in for your own. Replace it with the fees, rates, and billing terms that apply to the merchant account.',
      'By accepting, the business agrees to be billed under the pricing described here.',
    ],
  },
  'authorize-net': {
    title: 'Authorize.net Agreement',
    paragraphs: [
      'This sample Authorize.net agreement stands in for your own. Replace it with the payment gateway terms the business must accept.',
      'By accepting, the business agrees to be bound by the gateway terms described here.',
    ],
  },
} satisfies Record<string, Agreement>;

export type AgreementLinkType = keyof typeof AGREEMENTS;

export const isAgreementLinkType = (
  value: unknown,
): value is AgreementLinkType =>
  typeof value === 'string' && Object.hasOwn(AGREEMENTS, value);
