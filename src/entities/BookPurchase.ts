import { Book } from "./Book"

export class BookPurchase {
  book: Book
  quantity: number
  total: number

  constructor(book: Book, quantity: number) {
    this.book = book
    this.quantity = quantity
    this.total = book.bookSaleData.price * quantity
  }
}