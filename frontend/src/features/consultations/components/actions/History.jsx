import { For, Show, onMount } from "solid-js";
import HistoryElement from "./HistoryElement";
import { rightSidebarState } from "../../../../data/rightSidebarState";

function History() {
  onMount(() => {
    console.log("History");
    console.log(rightSidebarState.extraObject.data);
  });
  return (
    <>
      <Show
        when={
          rightSidebarState.extraObject.data.beneficiary.consultations.filter(
            (consultation) =>
              consultation._id !== rightSidebarState.extraObject.data._id
          )?.length > 0
        }
        fallback={
          <h3 class="font-semibold text-2xl mx-auto mt-5">
            Pas d'historique pour cette utilisateur
          </h3>
        }
      >
        <For
          each={rightSidebarState.extraObject.data.beneficiary.consultations.filter(
            (consultation) =>
              consultation._id !== rightSidebarState.extraObject.data._id
          )}
        >
          {(consultation) => <HistoryElement data={consultation} />}
        </For>
      </Show>
    </>
  );
}

export default History;
