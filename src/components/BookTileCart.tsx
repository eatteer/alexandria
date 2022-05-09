import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

/* Entities */
import { BookPurchase } from '../entities/BookPurchase'
import { Book } from '../entities/Book'

/* Redux */
import { removeBook, updateBookQuantity } from '../redux/purchase'

/* Components */
import { QuantitityField } from './QuantityField'

/* Component props */
type Props = {
  bookPurchase: BookPurchase
}

/* Component */
export const BookTileCart: React.FC<Props> = ({ bookPurchase }) => {
  /* States */
  const [quantity, setNumber] = useState(bookPurchase.quantity)
  
  /* Hooks */
  const dispatch = useDispatch()

  /* Effects */
  useEffect(() => {
    dispatch(updateBookQuantity(bookPurchase.book, quantity))
  }, [quantity])

  /* Handlers */
  const increment = () => {
    if (quantity < bookPurchase.book.bookSaleData.stock) {
      setNumber((prev) => prev + 1)
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setNumber((prev) => prev - 1)
    }
  }

  const handleRemoveBook = (book: Book) => {
    dispatch(removeBook(book))
  }

  /* Interface */
  return (
    <div
      key={bookPurchase.book.isbn13}
      className='
        flex items-start
        p-4
        border-b border-slate-200 last:border-0
      '
    >
      <img
        className='w-20 mr-4 rounded'
        src={bookPurchase.book.thumbnail}
        alt=''
      />
      <div>
        <h2 className='font-bold line-clamp-2'>{bookPurchase.book.title}</h2>
        <p className='text-sm'>Genre: {bookPurchase.book.genre}</p>
        <p className='text-sm'>Author: {bookPurchase.book.author}</p>
        <div>
          <span className='badge badge-green'>
            ${bookPurchase.book.bookSaleData.price}
          </span>
          <span className='badge badge-dark'>
            Stock: {bookPurchase.book.bookSaleData.stock}
          </span>
        </div>
        <div className='flex items-center space-x-4 mt-2'>
          <QuantitityField
            quantity={quantity}
            increment={increment}
            decrement={decrement}
          />
          <span
            className='text-sm font-bold text-pink-500'
            onClick={() => handleRemoveBook(bookPurchase.book)}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  )
}
