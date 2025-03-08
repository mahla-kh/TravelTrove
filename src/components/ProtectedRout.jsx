import { replace, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthProvider";
import { useEffect } from "react";

function ProtectedRout({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/", { replace: true });
      }
    },
    [isAuthenticated]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRout;
