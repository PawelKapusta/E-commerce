import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const GithubLoginScreen = () => {
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/auth/github")
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
  }, [isLoading]);

  if (!isLoading)
    return (
      <div>
        <h1>Github</h1>
        <CircularProgress />
      </div>
    );
  return (
    <div>
      <h3>Click in this link to log in with Github account:</h3>
      <a href={link.url}>Login</a>
    </div>
  );
};

export default GithubLoginScreen;
