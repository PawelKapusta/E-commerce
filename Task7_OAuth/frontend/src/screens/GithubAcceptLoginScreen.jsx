import { useContext, useEffect } from "react";
import loginContext from "../context/LoginContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const GithubAcceptLoginScreen = () => {
  const { setToken, setEmail, setIsAuthenticated } = useContext(loginContext);
  const { token, email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(token);
    setEmail(email);
    setIsAuthenticated(true);
  });

  const waitBeforeNavigate = () => {
    setTimeout(function () {
      navigate("/");
    }, 3000);
  };

  return (
    <div>
      <h1>Successfully loged in with Github account!</h1>
      Redirecting to main page in 3 ... 2 ... 1{waitBeforeNavigate()}
    </div>
  );
};

export default GithubAcceptLoginScreen;
