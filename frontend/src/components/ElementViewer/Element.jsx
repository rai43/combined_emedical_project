import moment from "moment";
import { onMount } from "solid-js";
import { openModal } from "../../data/modalState";
import { GLOBAL_CONSTANTS } from "../../utils/globalConstantUtil";
// import { openOrderDetailsModal } from "../../data/common/modalSlice";

const consultationsModalConfig = {
  title: "Détails de consultation",
  size: "lg",
  bodyType: GLOBAL_CONSTANTS.MODAL_BODY_TYPES.CONSULTATIONS_DONE_DETAILS,
  extraObject: {},
};

const Element = (props) => {
  console.log(props);
  const color = "primary";
  return (
    <>
      {/* <div
        tabIndex={0}
        className={`my-3 collapse border border-base-300 bg-base-100 rounded-box}`}
      >
        <div
          className="collapse-title text-xl font-medium hover:cursor-pointer"
          onClick={() => {
            console.log(props);
            openModal({
              ...consultationsModalConfig,
              extraObject: {
                data: props.element,
                config: { openInReadOnlyMode: true },
              },
            });
          }}
        >
          Consultation du
          <span class="ml-3 text-primary text-sm">
            {moment(props.element.created_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
          <div>
            {props.element.consulted_by.first_name +
              " " +
              props.element.consulted_by.family_name}
            <span class="ml-3 text-primary text-sm">
              {props.element.beneficiary.health_card_id}
            </span>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Element;
