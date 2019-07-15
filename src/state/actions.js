export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const CHANGE_SORT = "CHANGE_SORT"
export const ADD_ITEM = "ADD_ITEM"
export const REMOVE_ITEM = "REMOVE_ITEM"
export const CLEAR_CART = "CLEAR_CART"

export const login = username => ({
  type: LOGIN,
  username,
})

export const logout = () => ({
  type: LOGOUT,
})

export const changeSort = sort => ({
  type: CHANGE_SORT,
  preferredSort: sort,
})

export const addItem = item => ({
  type: ADD_ITEM,
  item
})

export const removeItem = itemKey => ({
  type: REMOVE_ITEM,
  itemKey
})