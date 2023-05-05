import { onMount } from "solid-js";
import { Route, useNavigate } from "@solidjs/router";
import { isTokenValid, isUserLoggedIn } from "./AuthenticationService";

const Protected = (props) => {
  onMount(() => {
    if (!isUserLoggedIn() || !isTokenValid()) window.location.href = "/login";
  });

  return <>{props.children}</>;
};

export default Protected;
