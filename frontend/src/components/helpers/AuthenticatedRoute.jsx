import { onMount } from "solid-js";
import { Route, useNavigate } from "@solidjs/router";
import { isTokenValid, isUserLoggedIn } from "./AuthenticationService";

const AuthenticatedRoute = (props) => {
  const navigate = useNavigate();
  onMount(() => {
    if (!isUserLoggedIn() || !isTokenValid())
      // navigate("/login", { replace: true });
      window.location.href = "/login";
  });

  return <Route {...props} />;
};

export default AuthenticatedRoute;
