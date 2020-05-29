import { SET_VISIBILITY_FILTER } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../constants";

const visibilityFilter = (state = VISIBILITY_FILTERS.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter