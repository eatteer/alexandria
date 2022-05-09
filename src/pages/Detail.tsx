import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

/* Entities */
import { Book } from '../entities/Book'

/* Services */
import { findByIsbn13 } from '../services/books-service'

/* Redux */
import { addBook } from '../redux/shopping-cart'

/* Components */
import { Topbar } from '../components/Topbar'

/* Icons */
import { IoCartOutline } from 'react-icons/io5'

/* Configs */
import { toastSuccessOptions } from '../components/toast/toast-options'

/* Component */
export const Detail: React.FC = () => {
  console.log('Rendering Detail') /* FOR DEBUGGING PURPOSES */

  /* States */
  const [book, setBook] = useState<Book | null>(null)

  /* Hooks */
  const { isbn13 } = useParams()
  const dispatch = useDispatch()

  /* Effects */
  useEffect(() => {
    const fetch = async () => {
      const book = await findByIsbn13(isbn13!)
      setBook(book)
    }
    fetch()
  }, [])

  /* Handlers */
  const addBookToShoppingCart = () => {
    dispatch(addBook(book!))
    toast.success('Added to cart', toastSuccessOptions)
  }

  /* Interface */
  return (
    <>
      {/* Topbar */}
      <Topbar />
      {/* Book detail */}
      {book && (
        <div className='flex flex-col items-center p-4'>
          {/* Poster */}
          <img className='mb-4 rounded' src={book.thumbnail} alt='' />
          {/* Details */}
          <div className='mb-4 text-center'>
            <h1 className='text-2xl font-bold'>{book.title}</h1>
            <p>ISBN13: {book.isbn13}</p>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            {/* Badges */}
            <div className='mt-2'>
              <span className='badge badge-green'>
                ${book.bookSaleData.price}
              </span>
              <span className='badge badge-yellow'>Rating: {book.rating}</span>
              <span className='badge badge-dark'>
                Stock: {book.bookSaleData.stock}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className='mb-4 text-sm text-slate-500 line-clamp-6'>
            {book.description}
          </p>
          {/* Button */}
          <button
            className='button button-primary w-full'
            onClick={addBookToShoppingCart}
          >
            Add to cart
            <span>
              <IoCartOutline size={24} />
            </span>
          </button>
        </div>
      )}
    </>
  )
}
