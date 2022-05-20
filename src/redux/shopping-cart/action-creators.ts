import { ShoppingCartDto } from "../../dtos/ShoppingCartDto"
import { Book } from "../../entities/Book"
import { SHOPPING_CART_ADD_BOOK, SHOPPING_CART_LOAD_SHOPPING_CART, SHOPPING_CART_REMOVE_BOOK, SHOPPING_CART_RESET_SHOPPING_CART, SHOPPING_CART_UPDATE_BOOK_QUANTITY } from "./types"

export const addBook = (book: Book) => {
  return {
    type: SHOPPING_CART_ADD_BOOK,
    payload: { book }
  }
}

export const removeBook = (book: Book) => {
  return {
    type: SHOPPING_CART_REMOVE_BOOK,
    payload: { book }
  }
}

export const updateBookQuantity = (book: Book, quantity: number) => {
  return {
    type: SHOPPING_CART_UPDATE_BOOK_QUANTITY,
    payload: {
      book,
      quantity
    }
  }
}

export const loadShoppingCart = (purchase: ShoppingCartDto) => {
  return {
    type: SHOPPING_CART_LOAD_SHOPPING_CART,
    payload: purchase
  }
}

export const resetShoppingCart = () => {
  return {
    type: SHOPPING_CART_RESET_SHOPPING_CART
  }
}