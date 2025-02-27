import React from 'react';

import Header from '../header-component/header-component';
import './layout.css';

const Layout = ({ children }) => {
    return (
      <>
        <Header></Header>
        <main>{children}</main>
      </>
    );
  };
  
  export default Layout;