import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import toast from "solid-toast";
import { setPageTitle } from "../../data/mainStoreFunctions";
import { isUserLoggedIn } from "../../components/helpers/AuthenticationService";
import ManageConsultationsHistory from "../../features/consultationsHistory/components/ManageConsultationsHistory";

function InternalPage() {
  const navigate = useNavigate();
  createEffect(() => {
    setPageTitle("Historique des consultations");
    if (!isUserLoggedIn()) {
      toast.error(
        "Oops! il semble que votre session a expiré. Reconnectez-vous."
      );
      setTimeout(() => {
        return navigate("/login", { replace: true });
      }, 3000);
    }
  });

  return <ManageConsultationsHistory />;
}

export default InternalPage;
