import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetShoppingCart } from '../redux/shopping-cart/action-creators'
import { register } from '../services/purchases-service'
import creditCard from '../assets/credit-card.png'
import { RiMastercardLine, RiPaypalLine, RiVisaFill } from 'react-icons/ri'
import { IoArrowBackOutline } from 'react-icons/io5'
import useModal from '../hooks/useModal'
import { Modal } from '../components/Modal'

export const Checkout: React.FC = () => {
  const store = useSelector<any, any>((store) => store)
  const { user, shoppingCart } = store
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isOpen, openModal, closeModal } = useModal()

  const registerPurchase = async () => {
    try {
      await register(user.accessToken, shoppingCart)
      dispatch(resetShoppingCart())
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

  return (
    <>
      <nav className='top-bar'>
        <IoArrowBackOutline className='mr-4' size={24} onClick={navigateBack} />
        <h1 className='text-2xl font-bold'>Checkout proccess</h1>
      </nav>
      <div className='mb-[75px] p-4'>
        {/* <img className='mb-4' src={creditCard} alt='Credit card' /> */}
        <p className='mb-4 text-xl font-medium'>Payment information</p>
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
      <nav className='bottom-bar justify-between'>
        <span className='text font-bold'>Total: ${shoppingCart.total}</span>
        <button className='button button-primary' onClick={openModal}>
          Confirm payment
        </button>
      </nav>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className='p-4'>
          <h2 className='text-xl font-bold'>Confirm payment</h2>
          <p className='mb-8'>Do you want to confirm the payment?</p>
          <div className='flex justify-end space-x-4'>
            <button className='button button-light' onClick={closeModal}>
              Cancel
            </button>
            <button
              className='button button-primary'
              onClick={registerPurchase}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
