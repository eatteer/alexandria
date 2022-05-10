import jwtDecode from "jwt-decode"
import { Token } from "../entities/Token"
import { User } from "../entities/User"

const URL_API = process.env.REACT_APP_SERVER

enum Roles {
  Client = 'client'
}

export const register = async (username: string, email: string, password: string): Promise<void> => {
  const endpoint = `${URL_API}/users`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
  if (response.ok) return
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const auth = async (username: string, password: string): Promise<User> => {
  const endpoint = `${URL_API}/auth/login`
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    const user = await response.json() as User
    const decodedToken = jwtDecode<Token>(user.accessToken)
    if (decodedToken.role !== Roles.Client) {
      throw new Error('Unauthorized')
    }
    return user
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const determineExistenceByUsername = async (username: string): Promise<boolean> => {
  const endpoint = `${URL_API}/users/existence?username=${username}`
  const response = await fetch(endpoint)
  if (response.ok) {
    const userExists = await response.json() as boolean
    return userExists
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const determineExistenceByEmail = async (email: string): Promise<boolean> => {
  const endpoint = `${URL_API}/users/existence?email=${email}`
  const response = await fetch(endpoint)
  if (response.ok) {
    const userExists = await response.json() as boolean
    return userExists
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}