const Select = (props) => {
  return (
    <div className={` w-full ${props.containerStyle}`}>
      <label className="label cursor-pointer justify-start">
        <input
          type="checkbox"
          className={"checkbox checkbox-primary mr-3 " + props.inputStyle}
          disabled={props.disabled || false}
        />
        <span className={"label-text " + props.labelStyle}>
          {props.labelTitle}
        </span>
      </label>
    </div>
  );
};

export default Select;
