import { Book } from "./Book"

export type BookPurchase = {
  id: number
  book: Book
  quantity: number
  total: number
}