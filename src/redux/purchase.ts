import { Book } from "../entities/Book";
import { BookPurchase } from "../entities/BookPurchase";
import { Purchase } from "../entities/Purchase";

const initialPurchase: Purchase = {
  bookPurchases: [],
  total: 0,
}

const _updateQuantity = (purchase: Purchase, book: Book, quantity: number) => {
  const updatedBookPurchase = new BookPurchase(book, quantity)
  const updatedBookPurchases = purchase.bookPurchases.map((bookPurchase) => {
    if (bookPurchase.book.isbn13 === book.isbn13) {
      return updatedBookPurchase
    }
    return bookPurchase
  })
  const updatedPurchase = new Purchase(updatedBookPurchases)
  return updatedPurchase
}

export const purchase = (purchase = initialPurchase, action: any) => {
  switch (action.type) {
    case 'SHOPPING_CART@ADD_BOOK': {
      const book = action.payload
      const bookPurchaseToUpdate = purchase.bookPurchases.find(bookPurchase => bookPurchase.book.isbn13 === book.isbn13)

      /* Book is already in the cart */
      if (bookPurchaseToUpdate) {
        const quantity = bookPurchaseToUpdate.quantity + 1
        const updatedPurchase = _updateQuantity(purchase, book, quantity)
        localStorage.setItem('purchase', JSON.stringify(updatedPurchase))
        return updatedPurchase
      }

      /* Book is not in the cart */
      const newBookPurchase: BookPurchase = {
        book: book,
        quantity: 1,
        total: book.bookSaleData.price,
      }
      const updatedBookPurchases = [...purchase.bookPurchases, newBookPurchase]
      const updatedPurchase = new Purchase(updatedBookPurchases)
      localStorage.setItem('purchase', JSON.stringify(updatedPurchase))
      return updatedPurchase
    }

    case 'SHOPPING_CART@REMOVE_BOOK': {
      const book = action.payload
      const updatedBookPurchases = purchase.bookPurchases.filter(
        (bookPurchase) => bookPurchase.book.isbn13 !== book.isbn13
      )
      const updatedPurchase = new Purchase(updatedBookPurchases)
      localStorage.setItem('purchase', JSON.stringify(updatedPurchase))
      return updatedPurchase
    }

    case 'SHOPPING_CART@UPDATE_BOOK_QUANTITY': {
      const book = action.payload.book
      const quantity = action.payload.quantity
      const updatedPurchase = _updateQuantity(purchase, book, quantity)
      localStorage.setItem('purchase', JSON.stringify(updatedPurchase))
      return updatedPurchase
    }

    case 'SHOPPING_CART@LOAD_PURCHASE': {
      const purchase = action.payload
      return purchase
    }

    case 'SHOPPING_CART@RESET_PURCHASE': {
      return initialPurchase
    }

    default:
      return purchase
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

export const loadPurchase = (purchase: Purchase) => {
  return {
    type: 'SHOPPING_CART@LOAD_PURCHASE',
    payload: purchase
  }
}

export const resetPurchase = () => {
  return {
    type: 'SHOPPING_CART@RESET_PURCHASE'
  }
}