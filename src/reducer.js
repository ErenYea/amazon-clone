export const initialState = {
  basket: [],
  user: null,
  notification: "",
  shownotification: false,
  shownotificationcompo: false,
  showheader: true,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id == action.payload
      );
      console.log(index);
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload}) as its not in basket`
        );
      }
      console.log(action.payload);
      return {
        ...state,
        basket: newBasket,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        shownotification: false,
      };
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        shownotification: true,
      };
    case "SHOW_NOTIFICATIONCOMPO":
      return {
        ...state,
        shownotificationcompo: true,
      };
    case "HIDE_NOTIFICATIONCOMPO":
      return {
        ...state,
        shownotificationcompo: false,
      };
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    case "TOGGLE_HEADER":
      return {
        ...state,
        showheader: !state.showheader,
      };
    default:
      return state;
  }
};

export default reducer;
