import { CartActionTypes } from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

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
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...currnetState,
        cartItems: removeItemFromCart(currnetState.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...currnetState,
        cartItems: currnetState.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    default:
      return currnetState;
  }
};

export default cartReducer;
