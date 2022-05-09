import { BookPurchaseDto } from "./BookPurchaseDto"

export class ShoppingCartDto {
  bookPurchases: BookPurchaseDto[]
  total: number = 0

  constructor(bookPurchases: BookPurchaseDto[]) {
    this.bookPurchases = bookPurchases
    bookPurchases.forEach(bookPurchase => {
      this.total += bookPurchase.total
    })
  }
}