import jwt_decode from "jwt-decode";

export const isUserLoggedIn = () => {
  let userId = localStorage.getItem("userId");
  if (userId === null) return false;
  return true;
};

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    localStorage.clear();
    return false;
  } else {
    const decodedToken = jwt_decode(token);
    console.log("decodedToken: ", decodedToken);
    let currentDate = new Date();
    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return false;
    }
  }
  return true;
};
