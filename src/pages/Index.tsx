
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to pages view instead of showing domains
    navigate("/pages");
  }, [navigate]);

  return null;
};

export default Index;
