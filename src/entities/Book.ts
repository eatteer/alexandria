import { BookSaleData } from "./BookSaleData"

export type Book = {
  isbn13: string
  title: string
  description: string
  thumbnail: string
  genre: string
  rating: number
  author: string
  bookSaleData: BookSaleData /* Ignored when fetching purchase history */
}