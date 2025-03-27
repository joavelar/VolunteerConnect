import React from 'react';
import './landing-page.css';

export default function LandingPage() {
    
    console.log("LandingPage component is rendering!");

    return(
        <>
        <div className="video-overlay"></div>
          <video autoPlay muted loop className="video-background">
            <source src="volunteerVideo.mp4" type="video/mp4" />
          </video>
          <main>
            <div className="content-center">
              <h1 className="brand-title">VOLUNTEER CONNECT</h1>
              <h2>Your Time. Their Future. Our Mission.</h2>
              <div className="search-bar">
                <input type="text" placeholder="Find City" />
                <button type="button">Search</button>
              </div>
            </div>
          </main>
        </>
    )
}