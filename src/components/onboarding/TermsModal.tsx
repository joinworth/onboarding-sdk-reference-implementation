import { useEffect, useRef } from 'react';

export interface TermsModalProps {
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
        Terms and Conditions
      </h2>
      <div className="max-h-64 overflow-y-auto text-sm text-black/70 space-y-3 mb-6">
        <p>
          These sample terms stand in for your own. Replace them with the
          agreement your applicants must accept before they submit.
        </p>
        <p>
          By accepting, the applicant confirms the information in this
          application is accurate and authorizes you to verify it.
        </p>
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
