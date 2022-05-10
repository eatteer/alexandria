import { Book } from "../entities/Book"

const URL_API = process.env.REACT_APP_SERVER

export const findAvailablesByKeyword = async (keyword: string): Promise<Book[]> => {
  const endpoint = `${URL_API}/books/availables?keyword=${keyword}`
  const response = await fetch(endpoint)
  if (response.ok) {
    const books = await response.json() as Book[]
    return books
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}

export const findByIsbn13 = async (isbn13: string): Promise<Book> => {
  const endpoint = `${URL_API}/books/${isbn13}`
  const response = await fetch(endpoint)
  if (response.ok) {
    const book = await response.json() as Book
    return book
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}