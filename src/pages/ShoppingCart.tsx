import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useModal from '../hooks/useModal'
import { BookTileCart } from '../components/BookTileCart'
import { Topbar } from '../components/Topbar'
import { SignInModal } from './SignInModal'
import { SignUpModal } from './SignUpModal'
import shoppingCartImage from '../assets/shopping-cart.png'
import { MdPayment } from 'react-icons/md'

export const ShoppingCart: React.FC = () => {
  console.log('Rendering ShoppingCart')

  const navigate = useNavigate()
  const store = useSelector<any, any>((store) => store)
  const { user, shoppingCart } = store

  const {
    isOpen: isOpenSignInModal,
    openModal: openSignInModal,
    closeModal: closeSignInModal,
  } = useModal()

  const {
    isOpen: isOpenSignUpModal,
    openModal: openSignUpModal,
    closeModal: closeSignUpModal,
  } = useModal()

  const proceedToPay = () => {
    if (!user) {
      openSignInModal()
      return
    }
    navigate('/checkout')
  }

  return (
    <>
      <Topbar />
      {shoppingCart.bookPurchases.length === 0 && (
        <div className='flex flex-col items-center p-4'>
          <h1 className='text-2xl text-center font-bold'>
            Your shopping cart is empty
          </h1>
          <p className='mb-8 text-xl text-slate-500'>Try adding some books</p>
          <img className='w-52' src={shoppingCartImage} alt='' />
        </div>
      )}
      {shoppingCart.bookPurchases.length > 0 && (
        <>
          <div className='mb-[75px]'>
            {shoppingCart.bookPurchases.map((bookPurchase: any) => {
              return (
                <BookTileCart
                  key={bookPurchase.book.isbn13}
                  bookPurchase={bookPurchase}
                />
              )
            })}
          </div>
          <nav className='bottom-bar justify-between'>
            <span className='text font-bold'>Total: ${shoppingCart.total}</span>
            <button className='button button-primary' onClick={proceedToPay}>
              Proceed to pay
              <span>
                <MdPayment size={24} />
              </span>
            </button>
          </nav>
        </>
      )}
      <SignInModal
        isOpen={isOpenSignInModal}
        closeModal={closeSignInModal}
        openSignUpModal={openSignUpModal}
      />
      <SignUpModal
        isOpen={isOpenSignUpModal}
        closeModal={closeSignUpModal}
        openSignInModal={openSignInModal}
      />
    </>
  )
}
