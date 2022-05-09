import { useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

/* Redux */
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Topbar } from '../components/Topbar'

/* Entities */
import { Purchase } from '../entities/Purchase'

/* Services */
import { findByUser } from '../services/purchases-service'

/* Component */
export const History: React.FC = () => {
  /* States */
  const [purchases, setPurchases] = useState<Purchase[] | null>(null)

  /* Hooks */
  const navigate = useNavigate()
  const user = useSelector<any, any>((store) => store.user)

  /* Effects */
  useEffect(() => {
    if (user) {
      const fetch = async () => {
        const purchases = await findByUser(user.accessToken)
        setPurchases(purchases)
      }
      fetch()
    }
  }, [])

  /* Handlers */
  const navigateBack = () => {
    navigate(-1)
  }

  /* Interface */
  return (
    <>
      <nav className='top-bar'>
        <IoArrowBackOutline className='mr-4' size={24} onClick={navigateBack} />
        <h1 className='text-2xl font-bold'>History purchase</h1>
      </nav>
      {purchases && purchases.length === 0 && (
        <div>Your history purchases is empty</div>
      )}
      {purchases && purchases.length > 0 && (
        <div className='p-4'>
          {purchases.map((purchase) => {
            const date = new Date(purchase.date)
            return (
              <div key={purchase.id}>
                <p>{date.toLocaleDateString('en-US')}</p>
                <p>{date.toLocaleTimeString('en-US')}</p>
                <p>{purchase.total}</p>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
