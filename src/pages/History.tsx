import { useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Purchase } from '../entities/Purchase'
import { findByUser } from '../services/purchases-service'

export const History: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[] | null>(null)

  const navigate = useNavigate()
  const user = useSelector<any, any>((store) => store.user)

  useEffect(() => {
    if (user) {
      const fetch = async () => {
        const purchases = await findByUser(user.accessToken)
        setPurchases(purchases)
      }
      fetch()
    }
  }, [])

  const navigateBack = () => {
    navigate(-1)
  }

  const navigateToHistoryDetail = (purchase: Purchase) => {
    navigate('/history/detail', { state: { purchase } })
  }

  return (
    <>
      <nav className='top-bar'>
        <IoArrowBackOutline className='mr-4' size={24} onClick={navigateBack} />
        <h1 className='text-2xl font-bold'>History purchase</h1>
      </nav>
      {purchases && purchases.length === 0 && (
        <div className='flex flex-col items-center p-4'>
        <h1 className='text-2xl text-center font-bold'>
          Your history is empty
        </h1>
        <p className='mb-8 text-xl text-slate-500'>Try buying books</p>
      </div>
      )}
      {purchases && purchases.length > 0 && (
        <div>
          {purchases.map((purchase) => {
            const date = new Date(purchase.date)
            return (
              <div
                key={purchase.id}
                className='p-4 border-b border-slate-200 last:border-0'
                onClick={() => navigateToHistoryDetail(purchase)}
              >
                <p className='font-bold'>{date.toLocaleDateString('en-US')}</p>
                <p className='text-slate-600'>
                  {date.toLocaleTimeString('en-US')}
                </p>
                <p className='text-slate-600'>${purchase.total}</p>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
