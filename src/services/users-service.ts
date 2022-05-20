import jwtDecode from "jwt-decode"
import { Token } from "../entities/Token"
import { User } from "../entities/User"
import { API_URL } from "../globals"

enum Roles {
  Client = 'client'
}

export const register = async (username: string, email: string, password: string): Promise<void> => {
  const endpoint = `${API_URL}/users/client`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })
  }
}

export const auth = async (username: string, password: string): Promise<User> => {
  const endpoint = `${API_URL}/auth/login`
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  }
  const user = await response.json() as User
  const decodedToken = jwtDecode<Token>(user.accessToken)
  if (decodedToken.role !== Roles.Client) {
    throw new Error('Unauthorized')
  }
  return user
}

export const determineExistenceByUsername = async (username: string): Promise<boolean> => {
  const endpoint = `${API_URL}/users/existence?username=${username}`
  const response = await fetch(endpoint)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })
  }
  const userExists = await response.json() as boolean
  return userExists
}

export const determineExistenceByEmail = async (email: string): Promise<boolean> => {
  const endpoint = `${API_URL}/users/existence?email=${email}`
  const response = await fetch(endpoint)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })

  } const userExists = await response.json() as boolean
  return userExists
}