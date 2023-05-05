import { createEffect, onMount } from "solid-js";


const Date = (props) => {
  let elt;

  onMount(() => {
    flatpickr("#dateRange", {
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
    });
  });

  return (
    <div className={` w-full ${props.containerStyle}`}>
      <label className="label cursor-pointer justify-start">
        <span className={"label-text " + props.labelStyle}>
          {props.labelTitle}
        </span>
        <input type="date" id="dateRange"></input>
        {/* <input
          type="date"
          ref={elt}
          // className={"checkbox checkbox-primary mr-3 " + props.inputStyle}
          disabled={props.disabled || false}
        /> */}
      </label>
    </div>
  );
};

export default Date;
