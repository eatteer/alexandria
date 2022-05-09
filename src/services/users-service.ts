const url = `http://${process.env.REACT_APP_SERVER}`

export const register = async (username: string, email: string, password: string) => {
  const endpoint = `${url}/users`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
  if (response.ok) {
    return
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const auth = async (username: string, password: string) => {
  const endpoint = `${url}/auth/login`
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    const user = await response.json()
    return user
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const determineExistenceByUsername = async (username: string) => {
  const endpoint = `${url}/users/existence?username=${username}`
  const response = await fetch(endpoint)
  if (response.ok) {
    const userExists = await response.json()
    return userExists
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const determineExistenceByEmail = async (email: string) => {
  const endpoint = `${url}/users/existence?email=${email}`
  const response = await fetch(endpoint)
  if (response.ok) {
    const userExists = await response.json()
    return userExists
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}