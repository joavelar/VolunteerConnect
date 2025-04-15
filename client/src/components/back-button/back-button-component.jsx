import React from 'react'
import BackIcon from '../../assets/backIcon';
import { useNavigate } from 'react-router-dom';
import './back-button.css'

function BackButton() {

    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };

    return(
      <>
        <div className="backButtonContainer">
            <button className="backButton" onClick={handleBack}>
                <BackIcon />
            </button>
        </div>
      </>
    );
};

export default BackButton