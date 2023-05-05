const TextAreaInput = (props) => {
  return (
    <>
      <div className={`form-control w-full ${props.containerStyle}`}>
        <label className="label">
          <span className={"label-text text-base-content " + props.labelStyle}>
            {props.labelTitle}
          </span>
        </label>
        <textarea
          value={props.value || ""}
          className={"textarea textarea-bordered w-full " + props.inputStyle}
          placeholder={props.placeholder || ""}
          disabled={props.disabled || false}
        ></textarea>
      </div>
    </>
  );
};

export default TextAreaInput;
