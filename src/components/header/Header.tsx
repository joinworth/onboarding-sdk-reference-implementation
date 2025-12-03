import type { ReactElement } from 'react'
import { Link } from 'react-router'
import logo from '@/assets/logo.png'
import './Header.css'

const Header = (): ReactElement => {
  return (
    <header className="bg-blue-950 text-white py-4 px-14 flex justify-center">
      <nav className="flex-1 max-w-7xl flex items-center justify-between self-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/product" className="header-btn">
            Product
          </Link>
          <Link to="/prefill-form" className="header-btn">
            Demo
          </Link>
          <Link to="/docs" className="header-btn">
            Docs
          </Link>
          <div className="relative">
            <button
              className="header-btn flex items-center gap-1 cursor-pointer"
              aria-expanded="false"
              aria-haspopup="true"
              aria-label="Resources menu"
            >
              Resources
              <svg
                width="14"
                height="14"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform"
                aria-hidden="true"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <Link to="/prefill-form" className="button-primary">
            Start demo
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
