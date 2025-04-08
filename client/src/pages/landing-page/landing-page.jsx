import React from 'react';
import './landing-page.css';

export default function LandingPage() {
    
    console.log("LandingPage component is rendering!");

    return(
        <>
        <div className="videoOverlay"></div>
          <video autoPlay muted loop className="videoBackground">
            <source src="volunteerVideo.mp4" type="video/mp4" />
          </video>
          <main>
            <div className="contentCenter">
              <h1 className="brandTitle">VOLUNTEER CONNECT</h1>
              <h2>Your Time. Their Future. Our Mission.</h2>
              <div className="searchBar">
                <input type="text" placeholder="Find City" />
                <button type="button">Search</button>
              </div>
            </div>
          </main>
        </>
    )
}