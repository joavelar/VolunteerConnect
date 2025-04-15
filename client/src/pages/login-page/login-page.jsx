import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { fetchUserProfile } from '../../services/authService';
import InputTextBox from '../../components/input-textbox-component/input-textbox-component';
import './login-page.css'

export default function Login() {
    
    const handleGoogle = async (role) => {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);

          // Retrieve Firebase ID token
          const idToken = await result.user.getIdToken();

          console.log("Your Firebase ID Token:", idToken); //remove when done

          // Fetch user profile using the service
          const data = await fetchUserProfile(idToken, role);

          console.log('Backend Response:', data);
        } catch (error) {
          console.error('Error during Google Sign-In:', error.message);
        }
    };
        return (
            <>
              <div className="loginContainer">
              <InputTextBox placeholder="Name" />
              <button onClick={() => handleGoogle('volunteer')}>Login as Volunteer</button>
              <button onClick={() => handleGoogle('organization')}>Login as Organization</button>
              </div>
            </>
          );
        };