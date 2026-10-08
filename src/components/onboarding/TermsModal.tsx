import { useEffect, useRef } from 'react';
import type { Agreement } from './agreements';

export interface TermsModalProps {
  /** The document the signal's `linkType` selected. */
  agreement: Agreement;
  /** Whether the applicant has accepted, as last sent to the form. */
  accepted: boolean;
  /**
   * Called when the applicant toggles the checkbox. Omit to show the terms
   * read-only, when the signal named no field to write back to.
   */
  onAcceptedChange?: (accepted: boolean) => void;
  /** Called once the dialog has closed, by the Close button or Escape. */
  onClose: () => void;
}

/**
 * Host-owned terms dialog. The onboarding flow asks for it with a `view-link`
 * signal; the host owns its content and reports acceptance back with
 * `postSignal`.
 */
const TermsModal = ({
  agreement,
  accepted,
  onAcceptedChange,
  onClose,
}: TermsModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="terms-modal-title"
      className="m-auto w-full max-w-lg rounded-xl bg-white p-6 text-black shadow-xl backdrop:bg-black/50"
    >
      <h2 id="terms-modal-title" className="text-2xl font-serif mb-4">
        {agreement.title}
      </h2>
      <div className="max-h-64 overflow-y-auto text-sm text-black/70 space-y-3 mb-6">
        {agreement.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {onAcceptedChange && (
        <label className="flex items-center gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => onAcceptedChange(event.target.checked)}
            className="size-5 accent-blue-500"
          />
          <span>I accept these terms</span>
        </label>
      )}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="button-primary"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};

export default TermsModal;
