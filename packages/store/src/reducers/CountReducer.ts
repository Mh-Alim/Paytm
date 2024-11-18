import { INCREMENT, DECREMENT, REFRESH } from "../actionTypes/counter";

const INITIAL_STATE = {
  count: 0,
  refresh: true,
};

const reducer = (state = INITIAL_STATE, action: { type: string }) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
      break;
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
      break;
    
    case REFRESH:
      return {
        ...state,
        refresh: !state.refresh,
      }
      break;
    default:
      return state;
  }
};

export default reducer;
