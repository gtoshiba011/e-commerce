import { CartActionTypes } from "./cart.types";

const INITIAL_STATE = {
  hidden: true,
};

const cartReducer = (currnetState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...currnetState,
        hidden: !currnetState.hidden,
      };
    default:
      return currnetState;
  }
};

export default cartReducer;
