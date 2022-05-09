import { BookPurchase } from "./BookPurchase"

export class Purchase {
  bookPurchases: BookPurchase[]
  total: number = 0

  constructor(bookPurchases: BookPurchase[]) {
    this.bookPurchases = bookPurchases
    bookPurchases.forEach(bookPurchase => {
      this.total += bookPurchase.total
    })
  }
}