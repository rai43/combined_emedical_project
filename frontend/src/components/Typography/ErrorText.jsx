const ErrorText = ({ styleClass, children }) => {
  return <p class={`text-center  text-error ${styleClass}`}>{children}</p>;
};

export default ErrorText;
