import { createStore as reduxCreateStore } from "redux"

const resolver = (state, action) => {
  return state
}

const initialState = {}

const createStore = () => reduxCreateStore(resolver, initialState)

export default createStore
