import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footerContainer">
      <img className="logoImg" src="/volunteer-connect-logo.png" alt="Logo" />
      <div className="poweredBy">
        Powered by bizzNEST Interns
        <div className="footerText">
          © Copyright 2024 | Volunteer Connect Corporations | All Rights
          Reserved
        </div>
      </div>
    </div>
  );
}

export default Footer;
