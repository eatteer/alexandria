import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

/* Entities */
import { Book } from '../entities/Book'

/* Services */
import { findAvailablesByKeyword } from '../services/books-service'

/* Components */
import { BookTile } from '../components/BookTile'
import { Topbar } from '../components/Topbar'

/* Images */
import problem from '../assets/problem.png'

/* Component */
export const Search: React.FC = () => {
  console.log('Rendering Search') /* FOR DEBUGGING PURPOSES */

  /* States */
  const [books, setBooks] = useState<Book[] | null>(null)

  /* Hooks */
  const navigate = useNavigate()
  const { keyword } = useParams()

  /* Effects */
  useEffect(() => {
    const fetch = async () => {
      const books = await findAvailablesByKeyword(keyword!)
      setBooks(books)
    }
    fetch()
  }, [keyword])

  /* Handlers */
  const navigateToBookDetail = (book: Book) => {
    navigate(`/book/${book.isbn13}`)
  }

  /* Interface */
  return (
    <>
      {/* Topbar */}
      <Topbar />
      {/* Nothing found */}
      {books && books.length === 0 && (
        <div className='flex flex-col items-center mt-4'>
          <img className='w-52 mb-4' src={problem} alt='' />
          <h1 className='text-center text-4xl font-bold'>Nothing found</h1>
        </div>
      )}
      {/* Books */}
      {books && books[0] && (
        <div>
          {books.map((book) => {
            return (
              <BookTile
                key={book.isbn13}
                book={book}
                onClick={() => navigateToBookDetail(book)}
              />
            )
          })}
        </div>
      )}
    </>
  )
}
