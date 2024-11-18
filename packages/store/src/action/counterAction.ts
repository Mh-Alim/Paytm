import { INCREMENT, DECREMENT, REFRESH } from "../actionTypes/counter";

export const increaseCounter = () => {
  return {
    type: INCREMENT,
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREMENT,
  };
};

export const refreshScreen = () => {
  return {
    type: REFRESH,
  };
};
