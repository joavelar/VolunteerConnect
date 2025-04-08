import React, { useState } from "react";
import Header from "../header-component/header-component";
import Footer from "../footer-component/footer-component";
import Sidebar from "../sidebar-component/sidebar-component";
import "./layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`layout-container ${isSidebarOpen ? 'pushed' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />
      {children}
      <Footer />
    </div> 
  );
};

export default Layout;

