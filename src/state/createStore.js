import { createStore as reduxCreateStore } from "redux"
import { LOGIN, LOGOUT, CHANGE_SORT } from "./actions"

const resolver = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loggedIn: true,
        username: action.username,
      }
    }
    case LOGOUT:
      return {
        loggedIn: false,
        username: null,
        cart: null,
      }
    case CHANGE_SORT:
      return {
        ...state,
        preferredSort: action.preferredSort,
      }
    default:
      return state
  }
}

const initialState = {
  loggedIn: false,
  username: null,
  preferredSort: "name",
  cart: null,
}

const createStore = () => reduxCreateStore(resolver, initialState)

export default createStore
