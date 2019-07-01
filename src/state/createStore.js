import { createStore as reduxCreateStore } from "redux"

const resolver = (state, action) => {
  return state
}

const initialState = {
  loggedIn: false,
  username: null,
  cart: null,
}

const createStore = () => reduxCreateStore(resolver, initialState)

export default createStore
