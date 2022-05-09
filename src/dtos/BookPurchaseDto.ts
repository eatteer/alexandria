import { Book } from "../entities/Book"

export class BookPurchaseDto {
  book: Book
  quantity: number
  total: number

  constructor(book: Book, quantity: number) {
    this.book = book
    this.quantity = quantity
    this.total = book.bookSaleData.price * quantity
  }
}