import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Book } from '../entities/Book'
import { findAvailablesByKeyword } from '../services/books-service'
import { BookTile } from '../components/BookTile'
import { Topbar } from '../components/Topbar'
import problem from '../assets/problem.png'

export const Search: React.FC = () => {
  // console.log('Rendering Search')

  const [books, setBooks] = useState<Book[] | null>(null)

  const navigate = useNavigate()
  const { keyword } = useParams()

  useEffect(() => {
    const fetch = async () => {
      const books = await findAvailablesByKeyword(keyword!)
      setBooks(books)
    }
    fetch()
  }, [keyword])

  const navigateToBookDetail = (book: Book) => {
    navigate(`/book/${book.isbn13}`)
  }

  return (
    <>
      <Topbar />
      {books && books.length === 0 && (
        <div className='flex flex-col items-center mt-4'>
          <img className='w-52 mb-4' src={problem} alt='' />
          <h1 className='text-center text-4xl font-bold'>Nothing found</h1>
        </div>
      )}
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
