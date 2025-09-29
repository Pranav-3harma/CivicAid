import React from 'react';
import CivicConnectLayout from './CivicConnectLayout';

const Layout = ({ children }) => {
  return (
    <CivicConnectLayout>
      {children}
    </CivicConnectLayout>
  );
};

export default Layout;