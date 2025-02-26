import './App.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

export default function App() {
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Retrieve Firebase ID token
      const idToken = await result.user.getIdToken();

      // Send the ID token to your backend for verification
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`, // Pass the token in the Authorization header
        },
      });

      const data = await response.json(); // Response from the backend
      console.log('Backend Response:', data);
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleGoogle}>
          Sign in with Google
        </button>
      </div>
    </>
  );
}