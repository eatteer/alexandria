import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Book } from '../entities/Book'
import { findByIsbn13 } from '../services/books-service'
import { addBook } from '../redux/shopping-cart'
import { Topbar } from '../components/Topbar'
import { IoCartOutline } from 'react-icons/io5'
import { toastSuccessOptions } from '../components/toast/toast-options'

export const BookDetail: React.FC = () => {
  console.log('Rendering Detail')

  const [book, setBook] = useState<Book | null>(null)

  const { isbn13 } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetch = async () => {
      const book = await findByIsbn13(isbn13!)
      setBook(book)
    }
    fetch()
  }, [])

  const addBookToShoppingCart = () => {
    dispatch(addBook(book!))
    toast.success('Added to cart', toastSuccessOptions)
  }

  return (
    <>
      <Topbar />
      {book && (
        <div className='flex flex-col items-center p-4'>
          <img className='mb-4 rounded' src={book.thumbnail} alt='' />
          <div className='mb-4 text-center'>
            <h1 className='text-2xl font-bold'>{book.title}</h1>
            <p className='text-slate-600'>ISBN13: {book.isbn13}</p>
            <p className='text-slate-600'>Author: {book.author}</p>
            <p className='text-slate-600'>Genre: {book.genre}</p>
            <div className='mt-2 space-x-2'>
              <span className='badge badge-green'>
                ${book.bookSaleData.price}
              </span>
              <span className='badge badge-yellow'>Rating: {book.rating}</span>
              <span className='badge badge-dark'>
                Stock: {book.bookSaleData.stock}
              </span>
            </div>
          </div>
          <p className='mb-4 text-sm text-slate-500 line-clamp-6'>
            {book.description}
          </p>
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
