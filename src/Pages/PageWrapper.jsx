import React, { useState } from 'react';
import Navbar from './Navbar';

const PageWrapper = ({ children }) => {
  const [mainContentPadding, setMainContentPadding] = useState(0);

  return (
    <>
      <Navbar setMainContentPadding={setMainContentPadding} />
      <main style={{ paddingTop: `${mainContentPadding}px` }} className="w-full">
        {children}
      </main>
    </>
  );
};

export default PageWrapper;