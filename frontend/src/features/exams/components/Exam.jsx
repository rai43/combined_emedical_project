import { BsPlusLg } from "solid-icons/bs";
import InputText from "../../../components/Input/InputTextWithOnChange";

const Exam = (props) => {
  return (
    <>
      <div class="grid grid-cols-1 gap-x-4 gap-y-1">
        <div class="col-span-4">
          <InputText
            type="text"
            name={"exam" + props.id}
            placeholder="Nom de l'examen"
            containerStyle="mt-1"
            labelTitle="Nom de l'examen"
            id={props.id}
            onValueChange={props.onValueChange}
          />
        </div>
      </div>
    </>
  );
};

export default Exam;
