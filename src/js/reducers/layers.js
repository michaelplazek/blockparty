import { stateReducer } from "./utils";
import { SET_LAYER, OPEN_LAYER, OPEN_MODAL, SET_MODAL } from "../actions";

const initialState = {
  layer: "",
  open: false,
  modal: "",
  modalOpen: false
};

const handlers = {
  [SET_LAYER]: (_, action) => ({
    layer: action.data
  }),
  [OPEN_LAYER]: (_, action) => ({
    open: action.data
  }),
  [SET_MODAL]: (_, action) => ({
    modal: action.data
  }),
  [OPEN_MODAL]: (_, action) => ({
    modalOpen: action.data
  })
};

export default stateReducer(initialState, handlers);
