import { Navigate } from "react-router";

const ResetConfig = () => {
  localStorage.clear();
  return <Navigate to="/warning" />;
};

export default ResetConfig;
