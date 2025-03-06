// fetching data with routes
export const fetchUserProfile = async (idToken, role) => {
    try {
      const response = await fetch(`http://localhost:4000/${role}s/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      throw error;
    }
  };