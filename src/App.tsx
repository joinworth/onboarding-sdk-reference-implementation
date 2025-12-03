import { useMemo, useRef, useState, type ReactElement } from 'react';
import { Outlet } from 'react-router';
import Header from '@/components/header/Header';
import ScrollToTop from '@/components/ScrollToTop';
import { AppContext } from './context/app';

const App = (): ReactElement => {
  const [token, setToken] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const value = useMemo(() => ({ token, setToken }), [token]);
  return (
    <AppContext.Provider value={value}>
      <ScrollToTop scrollContainerRef={scrollContainerRef} />
      <div className="flex flex-col h-screen w-screen bg-blue-950">
        <Header />
        <div
          ref={scrollContainerRef}
          className="flex flex-col flex-1 overflow-y-auto"
        >
          <Outlet />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
