import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

/* Hooks */
import useModal from '../hooks/useModal'

/* Components */
import { BookTileCart } from '../components/BookTileCart'
import { Topbar } from '../components/Topbar'

/* Modals */
import { SignInModal } from './SignInModal'
import { SignUpModal } from './SignUpModal'

/* Images */
import shoppingCartImage from '../assets/shopping-cart.png'

/* Icons */
import { MdPayment } from 'react-icons/md'

/* Component */
export const ShoppingCart: React.FC = () => {
  console.log('Rendering ShoppingCart') /* FOR DEBUGGING PURPOSES */

  /* Hooks */
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

  /* Handlers */
  const proceedToPay = () => {
    if (!user) {
      openSignInModal()
      return
    }
    navigate('/checkout')
  }

  /* Interface */
  return (
    <>
      {/* Topbar */}
      <Topbar />
      {/* Cart is empty */}
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
          {/* Book purchases */}
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
          {/* Bottom bar */}
          <nav className='bottom-bar justify-between'>
            <span className='text font-medium'>
              Total: ${shoppingCart.total}
            </span>
            <button className='button button-primary' onClick={proceedToPay}>
              Proceed to pay
              <span>
                <MdPayment size={24} />
              </span>
            </button>
          </nav>
        </>
      )}
      {/* Modals */}
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
