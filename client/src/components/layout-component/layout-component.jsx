import React from "react";

import Header from "../header-component/header-component";
import Footer from "../footer-component/footer-component";
import VolunteerListing from "../volunteer-listing-component/volunteer-listing-component"
import "./layout.css";

const Layout = ({ children, }) => {
  return (
    <div className="layout-container">
      <Header />
      {/* <div className="video-overlay"></div>
      <video autoPlay muted loop className="video-background">
        <source src="/volunteerVideo.mp4" type="video/mp4" />
      </video>
      <main>
      <div className="content-center">
        <h1 className="brand-title">VOLUNTEER CONNECT</h1>
        <h2>Your Time. Their Future. Our Mission.</h2>
          <div className="search-bar">
            <input type="text" placeholder="Find City" />
            <button type="button">Search</button>
          </div>
        </div> */}
        <VolunteerListing  OrgName='Volunteers'
                           EventName="Volunteer Fest"
                           Time="ten 0' clock"
                           Date="March 1st"
                           Location="Modesto"
                           NeededVolunteers="Infinity"
                           Description="Everyone should attend!"/>
        {/* {children} */}
      {/* </main> */}
      <Footer />
    </div>
  );
};

export default Layout;
