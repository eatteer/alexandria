import { BookPurchase } from "./BookPurchase"

export type Purchase = {
  id: number
  date: Date
  total: number
  bookPurchases: BookPurchase[]
}