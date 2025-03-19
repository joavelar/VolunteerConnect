import React from "react";
import "./volunteer-listing.css";

function VolunteerListing({ OrgName = "Unavailable",
                            EventName = "Unavailable",
                            Time = "Unavailable",
                            Date = "Unavailable",
                            Location = "Unavailable",
                            NeededVolunteers = "Unavailable",
                            Description = "Unavailable"
                          }) {
    return (
      <div className="volunteerListingContainer">
        <p className="orgTitle">{OrgName}</p>
        <div className="orgNameTimeDateContainer">
          <p className="orgStats">{EventName}</p>
          <p className="orgStats">{Time}</p>
          <p className="orgStats">{Date}</p>
        </div>
        <p className="orgStats">{Location}</p>
        <p className="orgStats">{`Spots Needed: ${NeededVolunteers}`}</p>
        <p className="orgDescription">{Description}</p>
      </div>
    );
  }
  
  export default VolunteerListing;