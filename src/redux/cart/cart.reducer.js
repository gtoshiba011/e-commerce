import { CartActionTypes } from "./cart.types";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (currnetState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...currnetState,
        hidden: !currnetState.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...currnetState,
        cartItems: addItemToCart(currnetState.cartItems, action.payload),
      };
    default:
      return currnetState;
  }
};

export default cartReducer;
