import { useState, useEffect } from "react";

const useFetchSectors = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    fetch("https://task-server-cyan.vercel.app/api/sectors")
      .then((response) => response.json())
      .then((data) => {
        setSectors(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { sectors, loading, error };
};

export default useFetchSectors;
