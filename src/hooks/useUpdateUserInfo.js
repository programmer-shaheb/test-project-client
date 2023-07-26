import { useState } from "react";

const useUpdateUserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateUserInfo = async (userData) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch(
        "https://task-server-cyan.vercel.app/api/update-user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
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

  return { updateUserInfo, loading, success, error };
};

export default useUpdateUserInfo;
