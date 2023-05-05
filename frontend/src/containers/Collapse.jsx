import { createSignal } from "solid-js";

const Collapse = (props) => {
  const [collapseOpened, setCollapseOpened] = createSignal(true);

  return (
    <div
      tabIndex={0}
      className={`border border-base-300 bg-base-100 rounded-box my-4 `}
      onClick={() => setCollapseOpened((prev) => !prev)}
    >
      <div className={`collapse-title text-sm font-medium`}>
        {props.title}
        {/* {exam.examName.toLocaleUpperCase()} - {exam.examType} */}
      </div>
      <div
        className={`collapse-content ${collapseOpened() ? "block" : "hidden"}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Collapse;
