const ToogleInput = (props) => {
  return (
    <>
      <div className={`form-control w-full ${props.containerStyle}`}>
        <label className="label cursor-pointer">
          <span className={"label-text text-base-content " + props.labelStyle}>
            {props.labelTitle}
          </span>
          <input
            type="checkbox"
            className="toggle"
            checked={props.value || false}
            disabled={props.disabled || false}
          />
        </label>
      </div>
    </>
  );
};

export default ToogleInput;
