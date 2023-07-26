import { useState, useEffect } from "react";

const useFetchUserInfo = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const response = await fetch(
          `https://task-server-cyan.vercel.app/api/user/${userId}`
        );
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchSingleUser();
  }, [userId]);

  return { user, loading, error };
};

export default useFetchUserInfo;
