import intro from "../../assets/intro.png";
import TemplatePointers from "./components/TemplatePointers";

import logoCnps from "../../assets/logoCnps.jpeg";

const LandingIntro = () => {
  return (
    <div class="hero min-h-full rounded-l-xl bg-base-200">
      <div class="hero-content py-12">
        <div class="max-w-md">
          <div class="text-center mt-12">
            <img
              src={logoCnps}
              alt="LinqSC Admin"
              class="w-48 inline-block"
            ></img>
          </div>

          {/* Importing pointers component */}
          <TemplatePointers />
        </div>
      </div>
    </div>
  );
};

export default LandingIntro;
