import { Book } from "../entities/Book"
import { API_URL } from "../globals"

export const findAvailablesByKeyword = async (keyword: string): Promise<Book[]> => {
  const endpoint = `${API_URL}/books/availables?keyword=${keyword}`
  console.log(endpoint)
  const response = await fetch(endpoint)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })
  }
  const books = await response.json() as Book[]
  return books
}

export const findByIsbn13 = async (isbn13: string): Promise<Book> => {
  const endpoint = `${API_URL}/books/${isbn13}`
  const response = await fetch(endpoint)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message, { cause: error })
  }
  const book = await response.json() as Book
  return book
}