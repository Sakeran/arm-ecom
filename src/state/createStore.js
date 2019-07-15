import { createStore as reduxCreateStore } from "redux"
import {
  LOGIN,
  LOGOUT,
  CHANGE_SORT,
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_CART,
} from "./actions"

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
        ...state,
        loggedIn: false,
        username: null,
        cart: [],
      }
    case CHANGE_SORT:
      return {
        ...state,
        preferredSort: action.preferredSort,
      }
    case ADD_ITEM:
      return {
        ...state,
        cart: [...state.cart, action.item],
      }
    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(e => e.slug !== action.itemKey)
      }
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      }
    default:
      return state
  }
}

const initialState = {
  loggedIn: false,
  username: null,
  preferredSort: "name",
  cart: [],
}

const createStore = () => reduxCreateStore(resolver, initialState)

export default createStore
