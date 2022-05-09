import { BookPurchase } from "../entities/BookPurchase";

const url = `http://${process.env.REACT_APP_SERVER}`

type createPurchaseDto = {
  bookPurchases: BookPurchase[];
  total: number;
}

export const register = async (accessToken: string, createPurchaseDto: createPurchaseDto) => {
  const endpoint = `${url}/purchases`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createPurchaseDto)
  })
  if (response.ok) {
    return
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}