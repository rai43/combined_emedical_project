import { Show, createEffect, createSignal } from "solid-js";
import { validateSchema } from "@felte/validator-zod";
import { createForm } from "@felte/solid";
import * as zod from "zod";
import { A } from "@solidjs/router";
import LandingIntro from "./LandingIntro";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import TitleCard from "../../components/Cards/TitleCard";
import ProfileSettings from "../settings/profile";

const Register = () => {
  return (
    <div class="min-h-screen bg-base-200 flex items-center">
      <div class="w-10/12 mx-auto">
        <TitleCard title={"Enregistrer"}>
          <ProfileSettings />
        </TitleCard>
      </div>
    </div>
  );
};

export default Register;
