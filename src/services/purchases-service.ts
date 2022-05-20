import { BookPurchaseDto } from "../dtos/BookPurchaseDto";
import { Purchase } from "../entities/Purchase";
import { API_URL } from "../globals";

type registerPurchaseDto = {
  bookPurchases: BookPurchaseDto[];
  total: number;
}

export const register = async (accessToken: string, registerPurchaseDto: registerPurchaseDto): Promise<void> => {
  const endpoint = `${API_URL}/purchases`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerPurchaseDto)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })
  }
  return
}

export const findByUser = async (accessToken: string): Promise<Purchase[]> => {
  const endpoint = `${API_URL}/purchases/history`
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })
  }
  const purchases = await response.json() as Purchase[]
  return purchases
}