import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

/* Redux */
import { reset } from '../redux/shopping-cart'
import { register } from '../services/purchases-service'

/* Images */
import creditCard from '../assets/credit-card.png'

/* Icons */
import { RiMastercardLine, RiPaypalLine, RiVisaFill } from 'react-icons/ri'
import { IoArrowBackOutline } from 'react-icons/io5'

/* Component */
export const Checkout: React.FC = () => {
  const store = useSelector<any, any>((store) => store)
  const { user, shoppingCart } = store

  /* Hooks */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* Handlers */
  const registerPurchase = async () => {
    try {
      await register(user.accessToken, shoppingCart)
      dispatch(reset())
      navigateToHome()
    } catch (error) {
      console.error(error)
    }
  }

  const navigateToHome = () => {
    navigate('/')
  }

  const navigateBack = () => {
    navigate(-1)
  }

  /* Interface */
  return (
    <>
      {/* Topbar */}
      <nav className='top-bar'>
        <IoArrowBackOutline className='mr-4' size={24} onClick={navigateBack} />
        <h1 className='text-2xl font-bold'>Checkout proccess</h1>
      </nav>
      {/* Body */}
      {/* Margin bottom to separete body from bottom bar */}
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
      {/* Bottom bar */}
      <nav className='bottom-bar justify-between'>
        <span className='text font-medium'>Total: ${shoppingCart.total}</span>
        <button className='button button-primary' onClick={registerPurchase}>
          Confirm payment
        </button>
      </nav>
    </>
  )
}
