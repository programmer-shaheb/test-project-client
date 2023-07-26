import { useEffect, useState } from "react";

const usePostUserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [success]);
  const postUserInfo = async (userData) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch(
        "https://task-server-cyan.vercel.app/api/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      const data = await response.json();
      setSuccess(true);
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postUserInfo, loading, success, error };
};

export default usePostUserInfo;
