import { createEffect, createSignal } from "solid-js";

const InputText = (props) => {
  return (
    <div class={`form-control w-full ${props.containerStyle}`}>
      <label class="label">
        <span class={"label-text text-base-content " + props.labelStyle}>
          {props.labelTitle}
        </span>
      </label>
      <input
        type={props.type || "text"}
        value={props.defaultValue || ""}
        name={props.name}
        placeholder={props.placeholder || ""}
        class={"input input-bordered w-full " + props.inputStyle}
        disabled={props.disabled || false}
        onChange={(e) => props.onValueChange(props.id, e.target.value, "value")}
      />
    </div>
  );
};

export default InputText;
