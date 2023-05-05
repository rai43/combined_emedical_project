import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import toast from "solid-toast";
import { setPageTitle } from "../../data/mainStoreFunctions";

import MedicalAct from "../../features/medical_act";
import { isUserLoggedIn } from "../../components/helpers/AuthenticationService";

function InternalPage() {
  const navigate = useNavigate();
  createEffect(() => {
    setPageTitle("Acts Médicaux");
    if (!isUserLoggedIn()) {
      toast.error(
        "Oops! il semble que votre session a expiré. Reconnectez-vous."
      );
      setTimeout(() => {
        return navigate("/login", { replace: true });
      }, 3000);
    }
  });

  return <MedicalAct />;
}

export default InternalPage;
