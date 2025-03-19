import React from "react";
import "./volunteer-listing.css";

function VolunteerListing({ OrgName = "Title Unavailable",
                            EventName = "Event Name Unavailable",
                            Time = "Time Unavailable",
                            Date = "Date Unavailable",
                            Location = "Location Unavailable",
                            NeededVolunteers = "Volunteers Needed Unavailable",
                            Description = "Description Unavailable"
                          }) {
    return (
      <div className="volunteerListingContainer">
        <p>{OrgName}</p>
        <p>{EventName}</p>
        <p>{Time}</p>
        <p>{Date}</p>
        <p>{Location}</p>
        <p>{NeededVolunteers}</p>
        <p>{Description}</p>
      </div>
    );
  }
  
  export default VolunteerListing;