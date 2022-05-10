import { MouseEventHandler } from 'react'
import { Book } from '../entities/Book'

type Props = {
  book: Book
  onClick: MouseEventHandler
}

export const BookTile: React.FC<Props> = ({ book, onClick }) => {
  return (
    <div
      className='
        flex
        p-4 space-x-4
        border-b border-slate-200 last:border-0
      '
      onClick={onClick}
    >
      <img className='w-20 rounded' src={book.thumbnail} alt='' />
      <div>
        <h2 className='font-bold line-clamp-2'>{book.title}</h2>
        <p className='text-sm'>Genre: {book.genre}</p>
        <p className='text-sm'>Author: {book.author}</p>
        <div className='space-x-2'>
          <span className='badge badge-green'>${book.bookSaleData.price}</span>
          <span className='badge badge-dark'>
            Stock: {book.bookSaleData.stock}
          </span>
        </div>
      </div>
    </div>
  )
}
