import { For } from "solid-js";
import { FILTERS_CONSTANTS } from "../../utils/globalConstantUtil";
import Select from "../Input/Select";

const Filter = (props) => {
  return (
    <div class="w-full py-5 pl-4">
      <h2 class="text-lg font-semibold ">Filtre</h2>
      <div class="w-full h-[25rem] overflow-y-scroll">
        <For each={FILTERS_CONSTANTS.FILTERS}>
          {(filterObject) => (
            <>
              <h2 class="capitalize text-xs font-bold my-4">
                {filterObject.LABEL.toLocaleLowerCase()}
              </h2>
              <For each={filterObject.FILTERS}>
                {(filter) => (
                  <>
                    <Select
                      labelTitle={filter.toLocaleLowerCase()}
                      labelStyle="capitalize text-xs font-semibold"
                      inputStyle="checkbox-xs"
                    />
                  </>
                )}
              </For>
            </>
          )}
        </For>
      </div>
    </div>
  );
};

export default Filter;
