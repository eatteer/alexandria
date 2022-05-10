import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Book } from '../entities/Book'
import { BookPurchaseDto } from '../dtos/BookPurchaseDto'
import { removeBook, updateBookQuantity } from '../redux/shopping-cart'
import { QuantitityField } from './QuantityField'

type Props = {
  bookPurchase: BookPurchaseDto
}

export const BookTileCart: React.FC<Props> = ({ bookPurchase }) => {
  const [quantity, setNumber] = useState(bookPurchase.quantity)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateBookQuantity(bookPurchase.book, quantity))
  }, [quantity])

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
