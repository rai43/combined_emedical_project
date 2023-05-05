import axios from "axios";
// import toast from "solid-toast";
import { isTokenValid } from "../components/helpers/AuthenticationService";

const checkAuth = () => {
  /*  Getting token value stored in localstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = ["login", "forgot-password", "register"];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );

  if ((!TOKEN && !isPublicPage) || window.location.href.endsWith("/")) {
    window.location.href = "/login";
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;

    axios.interceptors.request.use(
      function (config) {
        // UPDATE: Add this code to show global loading indicator
        document.body.classList.add("loading-indicator");
        return config;
      },
      function (error) {
        console.log(error);
        return Promise.reject("error");
      }
    );

    axios.interceptors.response.use(
      function (response) {
        // UPDATE: Add this code to hide global loading indicator
        document.body.classList.remove("loading-indicator");
        return response;
      },
      function (error) {
        console.log("error");
        // toast.error(
        //   "une erreur s'est produite, nous vous connectons. Veuillez vous reconnecter!"
        // );
        !isTokenValid() &&
          localStorage.clear() &&
          (window.location.href = "/login");
        // setTimeout(() => {
        // localStorage.clear();
        // window.location.href = "/login";
        // }, 500);
        document.body.classList.remove("loading-indicator");
        // const code = error.response.status
        // const response = error.response.data
        // const originalRequest = error.config;

        // if (code === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true

        //     auth.commit('logout');
        //     window.location.href = "/login";
        // }

        return Promise.reject(error);
        // return Promise.reject(error);
      }
    );
    return TOKEN;
  }
};

export default checkAuth;
