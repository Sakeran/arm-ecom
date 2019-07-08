export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const CHANGE_SORT = "CHANGE_SORT"

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
