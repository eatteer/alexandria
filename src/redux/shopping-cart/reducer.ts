import { Book } from "../../entities/Book";
import { BookPurchaseDto } from "../../dtos/BookPurchaseDto";
import { ShoppingCartDto } from "../../dtos/ShoppingCartDto";
import { SHOPPING_CART_ADD_BOOK, SHOPPING_CART_LOAD_SHOPPING_CART, SHOPPING_CART_REMOVE_BOOK, SHOPPING_CART_RESET_SHOPPING_CART, SHOPPING_CART_UPDATE_BOOK_QUANTITY } from "./types";

const initialShoppingCart: ShoppingCartDto = {
  bookPurchases: [],
  total: 0,
}

const updateBookQuantity = (shoppingCart: ShoppingCartDto, book: Book, quantity: number) => {
  const updatedBookPurchase = new BookPurchaseDto(book, quantity)
  const updatedBookPurchases = shoppingCart.bookPurchases.map((bookPurchase) => {
    if (bookPurchase.book.isbn13 === book.isbn13) {
      return updatedBookPurchase
    }
    return bookPurchase
  })
  const updatedShoppingCart = new ShoppingCartDto(updatedBookPurchases)
  return updatedShoppingCart
}

export const shoppingCartReducer = (shoppingCart = initialShoppingCart, action: any) => {
  switch (action.type) {
    case SHOPPING_CART_ADD_BOOK: {
      const book = action.payload.book as Book
      const bookPurchaseToUpdate = shoppingCart.bookPurchases.find(bookPurchase => bookPurchase.book.isbn13 === book.isbn13)

      /* Book is already in the cart */
      if (bookPurchaseToUpdate) {
        const quantity = bookPurchaseToUpdate.quantity + 1
        const updatedShoppingCart = updateBookQuantity(shoppingCart, book, quantity)
        localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart))
        return updatedShoppingCart
      }

      /* Book is not in the cart */
      const newBookPurchase: BookPurchaseDto = {
        book: book,
        quantity: 1,
        total: book.bookSaleData.price,
      }

      const updatedBookPurchases = [...shoppingCart.bookPurchases, newBookPurchase]
      const updatedShoppingCart = new ShoppingCartDto(updatedBookPurchases)
      localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart))

      return updatedShoppingCart
    }

    case SHOPPING_CART_REMOVE_BOOK: {
      const book = action.payload.book as Book

      const updatedBookPurchases = shoppingCart.bookPurchases.filter((bookPurchase) => bookPurchase.book.isbn13 !== book.isbn13)

      const updatedShoppingCart = new ShoppingCartDto(updatedBookPurchases)
      localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart))

      return updatedShoppingCart
    }

    case SHOPPING_CART_UPDATE_BOOK_QUANTITY: {
      const book = action.payload.book as Book
      const quantity = action.payload.quantity as number

      const updatedShoppingCart = updateBookQuantity(shoppingCart, book, quantity)
      localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart))

      return updatedShoppingCart
    }

    case SHOPPING_CART_LOAD_SHOPPING_CART: {
      const shoppingCart = action.payload
      return shoppingCart
    }

    case SHOPPING_CART_RESET_SHOPPING_CART: {
      localStorage.removeItem('shoppingCart')
      return initialShoppingCart
    }

    default:
      return shoppingCart
  }
}

