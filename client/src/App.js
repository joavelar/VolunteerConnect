import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { fetchUserProfile } from './services/authService';
import Layout from './Components/layout-component/layout-component.jsx';

export default function App() {
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Retrieve Firebase ID token
      const idToken = await result.user.getIdToken();

      // Fetch user profile using the service
      const data = await fetchUserProfile(idToken);

      console.log('Backend Response:', data);
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
    }
  };

  return (
    <>
      <Layout>
        <div>
          <button onClick={handleGoogle}>
            Sign in with Google
          </button>
        </div>
      </Layout>
    </>
  );
}