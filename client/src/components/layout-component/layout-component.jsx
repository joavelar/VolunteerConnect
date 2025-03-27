import React from "react";

import Header from "../header-component/header-component";
import Footer from "../footer-component/footer-component";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
