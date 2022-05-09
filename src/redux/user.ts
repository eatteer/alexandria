export const user = (state: any = null, action: any) => {
  switch (action.type) {
    case 'USER@LOGIN':
      const user = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      return user
    case 'USER@LOGOUT':
      localStorage.removeItem('user')
      return null
    default:
      return state
  }
}

export const login = (user: any) => {
  return {
    type: 'USER@LOGIN',
    payload: user
  }
}

export const logout = () => {
  return {
    type: 'USER@LOGOUT'
  }
}