import { Book } from "../entities/Book";
import { BookPurchaseDto } from "../dtos/BookPurchaseDto";
import { ShoppingCartDto } from "../dtos/ShoppingCartDto";

const initialShoppingCart: ShoppingCartDto = {
  bookPurchases: [],
  total: 0,
}

const _updateQuantity = (shoppingCart: ShoppingCartDto, book: Book, quantity: number) => {
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

export const shoppingCart = (shoppingCart = initialShoppingCart, action: any) => {
  switch (action.type) {
    case 'SHOPPING_CART@ADD_BOOK': {
      const book = action.payload
      const bookPurchaseToUpdate = shoppingCart.bookPurchases.find(bookPurchase => bookPurchase.book.isbn13 === book.isbn13)

      /* Book is already in the cart */
      if (bookPurchaseToUpdate) {
        const quantity = bookPurchaseToUpdate.quantity + 1
        const updatedShoppingCart = _updateQuantity(shoppingCart, book, quantity)
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

    case 'SHOPPING_CART@REMOVE_BOOK': {
      const book = action.payload
      const updatedBookPurchases = shoppingCart.bookPurchases.filter(
        (bookPurchase) => bookPurchase.book.isbn13 !== book.isbn13
      )
      const updatedShoppingCart = new ShoppingCartDto(updatedBookPurchases)
      localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart))
      return updatedShoppingCart
    }

    case 'SHOPPING_CART@UPDATE_BOOK_QUANTITY': {
      const book = action.payload.book
      const quantity = action.payload.quantity
      const updatedShoppingCart = _updateQuantity(shoppingCart, book, quantity)
      localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart))
      return updatedShoppingCart
    }

    case 'SHOPPING_CART@LOAD_SHOPPING_CART': {
      const shoppingCart = action.payload
      return shoppingCart
    }

    case 'SHOPPING_CART@RESET_SHOPPING_CART': {
      localStorage.removeItem('shoppingCart')
      return initialShoppingCart
    }

    default:
      return shoppingCart
  }
}

export const addBook = (book: Book) => {
  return {
    type: 'SHOPPING_CART@ADD_BOOK',
    payload: book
  }
}

export const removeBook = (book: Book) => {
  return {
    type: 'SHOPPING_CART@REMOVE_BOOK',
    payload: book
  }
}

export const updateBookQuantity = (book: Book, quantity: number) => {
  return {
    type: 'SHOPPING_CART@UPDATE_BOOK_QUANTITY',
    payload: {
      book,
      quantity
    }
  }
}

export const load = (purchase: ShoppingCartDto) => {
  return {
    type: 'SHOPPING_CART@LOAD_SHOPPING_CART',
    payload: purchase
  }
}

export const reset = () => {
  return {
    type: 'SHOPPING_CART@RESET_SHOPPING_CART'
  }
}