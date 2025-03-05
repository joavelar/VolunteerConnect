import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { fetchUserProfile } from './services/authService';
import Layout from './components/layout-component/layout-component';

export default function App() {
  const handleGoogle = async (role) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Retrieve Firebase ID token
      const idToken = await result.user.getIdToken();

      // Fetch user profile using the service
      const data = await fetchUserProfile(idToken, role);

      console.log('Backend Response:', data);
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
    }
  };
  
  return (
    <>
      <Layout>
        <div>
        <button onClick={() => handleGoogle('volunteer')}>Login as Volunteer</button>
        <button onClick={() => handleGoogle('organization')}>Login as Organization</button>
        </div>
      </Layout>
    </>
  );
}