import { createStore, produce } from "solid-js/store";

export const [rightSidebarState, setRightSidebarState] = createStore({
  header: "", // current title state management
  isOpen: false, // modal state management for opening closing
  bodyType: "",
  extraObject: {},
});

// export const openModal = (modalParams) => {
//   setModalState(
//     produce((state) => {
//       state.isOpen = true;
//       state.title = modalParams.title;
//       state.size = modalParams.size || "md";
//       state.bodyType = modalParams.bodyType || "";
//       state.extraObject = modalParams.extraObject || {};
//     })
//   );
//   console.log(modalState);
// };

export const openRightSideBar = (modalParams) => {
  console.log(rightSidebarState);
  setRightSidebarState(
    produce((state) => {
      state.isOpen = true;
      state.header = modalParams.header;
      state.bodyType = modalParams.bodyType || "";
      state.extraObject = modalParams.extraObject || {};
    })
  );
};

export const closeRightSideBar = () => {
  setRightSidebarState(
    produce((state) => {
      state.isOpen = false;
      state.header = "";
      state.size = "";
      state.bodyType = "";
      state.extraObject = {};
    })
  );
};
