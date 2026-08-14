import { type ReactElement } from 'react';
import { Link } from 'react-router';
import logo from '@/assets/logo.png';
import './Header.css';

const Header = (): ReactElement => {
  // the SDK's StepContainer sizes itself to calc(100dvh - 4rem), so chrome taller than 4rem pushes the
  // step footer below the fold. Mirrors onboarding-application's Navigation.
  return (
    <header className="text-white h-16 sm:h-auto sm:py-4 px-4 sm:px-14 flex items-center justify-center">
      <nav className="flex-1 max-w-7xl flex items-center justify-between self-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/" className="header-btn">
            Product
          </Link>
          <Link
            to="https://github.com/joinworth/onboarding-sdk-reference-implementation"
            className="header-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </Link>
          <Link to="/demo-flows" className="button-primary">
            Start demo
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
