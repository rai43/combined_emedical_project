import { Show, createSignal, onMount } from "solid-js";
import InputText from "../../../../components/Input/InputText";
import moment from "moment";

const HistoryElement = (props) => {
  const [isOpened, setIsOpened] = createSignal(false);
  return (
    <>
      <div
        tabIndex={0}
        className={`my-3 collapse collapse-plus border border-base-300 bg-base-100 rounded-box ${
          isOpened() ? "collapse-open" : "collapse-close"
        }`}
      >
        <div
          className="collapse-title text-xl font-medium hover:cursor-pointer"
          onClick={() => setIsOpened((prevState) => !prevState)}
        >
          Consultation du{" "}
          {moment(props.data.created_at).format("DD/MM/YYYY HH:mm")}{" "}
          <span class="text-primary">({props.data.constant.card_number})</span>
        </div>
        <div className="collapse-content">
          <div class="mb-4">
            <div className="divider">CONSTANTES</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
              <div>
                <InputText
                  type="text"
                  placeholder="N. carte de santé"
                  defaultValue={props.data.constant.card_number}
                  containerStyle="mt-1"
                  labelTitle="N. carte de santé"
                  disabled={true}
                />
              </div>
              <div>
                <InputText
                  type="text"
                  placeholder="Témperature"
                  defaultValue={props.data.constant.temperature}
                  containerStyle="mt-1"
                  labelTitle="Témperature"
                  disabled={true}
                />
              </div>
              <div>
                <InputText
                  type="number"
                  placeholder="Taille (cm)"
                  defaultValue={props.data.constant.height}
                  containerStyle="mt-1"
                  labelTitle="Taille (cm)"
                  disabled={true}
                />
              </div>
              <div>
                <InputText
                  type="text"
                  placeholder="Poids (cm)"
                  defaultValue={props.data.constant.weight}
                  containerStyle="mt-1"
                  labelTitle="Poids (cm)"
                  disabled={true}
                />
              </div>
              <div>
                <InputText
                  type="text"
                  placeholder="Pouls (bpm)"
                  defaultValue={props.data.constant.pulse}
                  containerStyle="mt-1"
                  labelTitle="Pouls (bpm)"
                  disabled={true}
                />
              </div>
              <div>
                <InputText
                  type="text"
                  placeholder="Tension Arterielle"
                  defaultValue={props.data.constant.blood_pressure}
                  containerStyle="mt-1"
                  labelTitle="Tension Arterielle"
                  disabled={true}
                />
              </div>
            </div>

            <div className="divider">CONSULTATION</div>
            <Show
              when={props.data.sickness && props.data.comments}
              fallback={
                <h3 class="font-semibold text-xl mx-auto mt-5">
                  Pas encore consulté
                </h3>
              }
            >
              <div class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
                <div class="md:col-span-1">
                  <InputText
                    type="text"
                    name="sickness"
                    defaultValue={props.data.sickness}
                    placeholder="Pathologie"
                    containerStyle="mt-1"
                    labelTitle="Pathologie"
                    disabled={true}
                  />
                </div>
                <div class="md:col-span-2">
                  <div class={`form-control w-full mt-1`}>
                    <label className="label">
                      <span className="label-text">Commentaire</span>
                    </label>
                    <div class="w-full bg-gray-50 rounded-sm px-4 py-3">
                      {props.data.comments}
                    </div>
                  </div>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryElement;
