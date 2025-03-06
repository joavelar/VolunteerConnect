import React from "react";

import Header from "../header-component/header-component";
import Footer from "../footer-component/footer-component";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="video-overlay"></div>
      <video autoPlay muted loop className="video-background">
        <source src="/volunteerVideo.mp4" type="video/mp4" />
      </video>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
