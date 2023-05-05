import axios from "axios";
// import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

import { TbLayoutDashboard } from "solid-icons/tb";
import { onMount } from "solid-js";

function SelectBox(props) {
  return (
    <div class={`inline-block w-full ${props.containerStyle}`}>
      <label class={`label  ${props.labelStyle}`}>
        <div class="label-text">
          {props.labelTitle}
          {props.labelDescription && (
            <div
              class="tooltip tooltip-right"
              data-tip={props.labelDescription}
            >
              <TbLayoutDashboard class="w-4 h-4" />
            </div>
          )}
        </div>
      </label>

      <select
        class={"select select-bordered w-full " + props.selectStyle}
        value={props.value}
        name={props.name}
        disabled={props.disabled || false}
      >
        <option disabled selected value="PLACEHOLDER">
          {props.placeholder}
        </option>
        {props.options.map((o, _) => {
          return (
            <option
              value={o.value || o.name}
              selected={o.value === props.value}
            >
              {o.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectBox;
