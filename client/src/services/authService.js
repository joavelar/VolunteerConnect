// fetching data with routes
export const fetchUserProfile = async (idToken, role) => {
  try {
    const response = await fetch(`http://localhost:4000/${role}s/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Throw the backend's message if available
      throw new Error(data.message || 'Failed to fetch user profile');
    }

    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
};
