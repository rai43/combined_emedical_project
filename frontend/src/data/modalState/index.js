import { createStore, produce } from "solid-js/store";

export const [modalState, setModalState] = createStore({
  title: "", // current title state management
  isOpen: false, // modal state management for opening closing
  size: "", // modal content management
  bodyType: "",
  extraObject: {},
});

export const openModal = (modalParams) => {
  setModalState(
    produce((state) => {
      state.isOpen = true;
      state.title = modalParams.title;
      state.size = modalParams.size || "md";
      state.bodyType = modalParams.bodyType || "";
      state.extraObject = modalParams.extraObject || {};
    })
  );
  console.log(modalState);
};

export const closeModal = () => {
  setModalState(
    produce((state) => {
      state.isOpen = false;
      state.title = "";
      state.size = "";
      state.bodyType = "";
      state.extraObject = {};
    })
  );
};
