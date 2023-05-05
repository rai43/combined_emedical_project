import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import toast from "solid-toast";
import { setPageTitle } from "../../data/mainStoreFunctions";

import { isUserLoggedIn } from "../../components/helpers/AuthenticationService";
import ManageUsers from "../../features/user/components/ManageUsers";

function InternalPage() {
  const navigate = useNavigate();
  createEffect(() => {
    setPageTitle("Création d'utilisateur");
    if (!isUserLoggedIn()) {
      toast.error(
        "Oops! il semble que votre session a expiré. Reconnectez-vous."
      );
      setTimeout(() => {
        return navigate("/login", { replace: true });
      }, 3000);
    }
  });

  return <ManageUsers />;
}

export default InternalPage;
