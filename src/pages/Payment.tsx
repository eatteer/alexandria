import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

/* Redux */
import { resetPurchase } from '../redux/purchase'
import { register } from '../services/purchases-service'

/* Components */
import { Appbar } from '../components/Appbar'

/* Images */
import creditCard from '../assets/credit-card.png'

/* Icons */
import { RiMastercardLine, RiPaypalLine, RiVisaFill } from 'react-icons/ri'
import { IoArrowBackOutline } from 'react-icons/io5'

/* Component */
export const Payment: React.FC = () => {
  const store = useSelector<any, any>((store) => store)
  const { user, purchase } = store

  /* Hooks */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* Handlers */
  const registerPurchase = async () => {
    try {
      await register(user.accessToken, purchase)
      dispatch(resetPurchase())
      navigateToHome()
    } catch (error) {
      console.error(error)
    }
  }

  const navigateToHome = () => {
    navigate('/home')
  }

  const navigateBack = () => {
    navigate(-1)
  }

  /* Interface */
  return (
    <>
      {/* Appbar */}
      <Appbar>
        <IoArrowBackOutline size={24} onClick={navigateBack} />
        <h1 className='text-2xl font-bold'>Checkout proccess</h1>
      </Appbar>
      {/* Body */}
      {/* Margin bottom to separete body from bottom navigation bar */}
      <div className='mb-[75px] p-4'>
        <img className='mb-4' src={creditCard} alt='' />
        <p className='mb-4 text-xl font-medium'>Payment information</p>
        {/* Payment options */}
        <div className='flex mb-4 space-x-4'>
          <span className='py-2 px-4 border-2 rounded border-blue-600'>
            <RiMastercardLine size={24} />
          </span>
          <span className='py-2 px-4 border-2 rounded border-slate-300'>
            <RiPaypalLine size={24} />
          </span>
          <span className='py-2 px-4 border-2 rounded border-slate-300'>
            <RiVisaFill size={24} />
          </span>
        </div>
        {/* Inputs */}
        <div className='space-y-4'>
          <div>
            <p className='mb-1'>Name on card</p>
            <input className='input' type='text' />
          </div>
          <div>
            <p className='mb-1'>Card number</p>
            <input className='input' type='text' />
          </div>
          <div className='flex space-x-4'>
            <div>
              <p className='mb-1'>Expiration</p>
              <input className='input' type='text' />
            </div>
            <div>
              <p className='mb-1'>CVV</p>
              <input className='input' type='text' />
            </div>
          </div>
        </div>
      </div>
      {/* Bottom navigation bar */}
      <div
        className='
          fixed bottom-0
          flex justify-between items-center
          w-full
          p-4 
          border-t border-slate-200
          bg-white
        '
      >
        <span className='text font-medium'>Total: ${purchase.total}</span>
        <button className='button button-primary' onClick={registerPurchase}>
          Confirm payment
        </button>
      </div>
    </>
  )
}
