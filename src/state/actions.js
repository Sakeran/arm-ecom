export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export const login = username => ({
  type: LOGIN,
  username,
})

export const logout = () => ({
  type: LOGOUT,
})
