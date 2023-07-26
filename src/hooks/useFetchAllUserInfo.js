import { useState, useEffect } from "react";

const useFetchAllUserInfo = (newUser) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchAllUserInfo = async () => {
      try {
        const response = await fetch(
          "https://task-server-cyan.vercel.app/api/all-user"
        );
        const data = await response.json();
        setUserInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all user information:", error);
        setError("Failed to fetch user information");
        setLoading(false);
      }
    };
    if (newUser) {
      fetchAllUserInfo();
    }
  }, [newUser]);

  return { userInfo, loading, error };
};

export default useFetchAllUserInfo;
