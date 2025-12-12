import { useRef, type ReactElement } from 'react';
import { Outlet } from 'react-router';
import Header from '@/components/header/Header';
import ScrollToTop from '@/components/ScrollToTop';

const App = (): ReactElement => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
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
    </>
  );
};

export default App;
