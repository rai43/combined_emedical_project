import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import toast from "solid-toast";
import { setPageTitle } from "../../data/mainStoreFunctions";
import Consultations from "../../features/consultations";
import { isUserLoggedIn } from "../../components/helpers/AuthenticationService";

function InternalPage() {
  const navigate = useNavigate();
  createEffect(() => {
    setPageTitle("Consultations");
    if (!isUserLoggedIn()) {
      toast.error(
        "Oops! il semble que votre session a expiré. Reconnectez-vous."
      );
      setTimeout(() => {
        return navigate("/login", { replace: true });
      }, 3000);
    }
  });

  return <Consultations />;
}

export default InternalPage;
