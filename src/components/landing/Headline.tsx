import type { ReactElement } from 'react';
import { Link } from 'react-router';

const Headline = (): ReactElement => {
  return (
    <div className="flex justify-center px-6 py-29 text-white">
      <div className="text-center space-y-8">
        <h1 className="text-[80px] font-serif text-white leading-22">
          Underwriting,
          <br />
          simplified with
          <br />
          Daisy Financial
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-7">
          Experience a modern underwriting flow built for accuracy, speed, and
          enterprise trust. Streamline your financial risk assessment with
          intelligent automation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/demo-flows" className="button-secondary-dark">
            Customize Demo
          </Link>
          <Link
            to="https://github.com/joinworth/onboarding-sdk-reference-implementation"
            className="button-secondary-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Headline;
