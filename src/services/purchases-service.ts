import { BookPurchaseDto } from "../dtos/BookPurchaseDto";
import { Purchase } from "../entities/Purchase";

const url = `http://${process.env.REACT_APP_SERVER}`

type registerPurchaseDto = {
  bookPurchases: BookPurchaseDto[];
  total: number;
}

export const register = async (accessToken: string, registerPurchaseDto: registerPurchaseDto) => {
  const endpoint = `${url}/purchases`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerPurchaseDto)
  })
  if (response.ok) {
    return
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const findByUser = async (accessToken: string): Promise<Purchase[]> => {
  const endpoint = `${url}/purchases/history`
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  if (response.ok) {
    const purchases = await response.json() as Purchase[]
    return purchases
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}