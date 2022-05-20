import { USER_LOGIN, USER_LOGOUT } from "./types"

export const login = (user: any) => {
  return {
    type: USER_LOGIN,
    payload: { user }
  }
}

export const logout = () => {
  return {
    type: USER_LOGOUT
  }
}