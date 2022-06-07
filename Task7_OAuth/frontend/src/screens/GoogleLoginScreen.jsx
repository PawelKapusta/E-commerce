import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const GoogleLoginScreen = () => {
  const [link, setLink] = useState("none");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/auth/google")
      .then(res => res.json())
      .then(
        result => {
          setIsLoading(true);
          setLink(result);
        },
        error => {
          console.log(error);
          setIsLoading(true);
        },
      );
  }, []);

  if (!isLoading)
    return (
      <div>
        <h1>Google</h1>
        <CircularProgress />
      </div>
    );
  return (
    <div>
      <h3>Click in this link to log in with Google account:</h3>
      <a href={link.url}>Login</a>
    </div>
  );
};

export default GoogleLoginScreen;
