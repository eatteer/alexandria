import { IoArrowBackOutline } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'
import { Purchase } from '../entities/Purchase'

type LocationState = {
  purchase: Purchase
}

export const HistoryDetail: React.FC = () => {
  const location = useLocation()
  const state = location.state as LocationState
  const purchase = state.purchase

  const navigate = useNavigate()

  const navigateBack = () => {
    navigate(-1)
  }

  const date = new Date(purchase.date)

  return (
    <>
      <nav className='top-bar'>
        <IoArrowBackOutline className='mr-4' size={24} onClick={navigateBack} />
        <h1 className='text-2xl font-bold'>{date.toLocaleDateString()}</h1>
      </nav>
      <div>
        {purchase.bookPurchases.map((bookPurchase) => {
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
                className='w-20 mr-4 rounded object-cover'
                src={bookPurchase.book.thumbnail}
                alt=''
              />
              <div>
                <h2 className='text-lg font-bold line-clamp-2'>
                  {bookPurchase.book.title}
                </h2>
                <p className='text-slate-600'>
                  Price: ${bookPurchase.total / bookPurchase.quantity}
                </p>
                <p className='text-slate-600'>
                  Quantity: {bookPurchase.quantity}
                </p>
                <p className='text-slate-600'>Total: ${bookPurchase.total}</p>
              </div>
            </div>
          )
        })}
        <p className='p-4 text-xl font-bold'>Total: ${purchase.total}</p>
      </div>
    </>
  )
}
