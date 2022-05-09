import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

/* Hooks */
import useModal from '../hooks/useModal'

/* Components */
import { BookTileCart } from '../components/BookTileCart'
import { Navbar } from '../components/Navbar'

/* Modals */
import { SignInModal } from './SignInModal'
import { SignUpModal } from './SignUpModal'

/* Images */
import shoppingCart from '../assets/shopping-cart.png'

/* Icons */
import { MdPayment } from 'react-icons/md'

/* Component */
export const ShoppingCart: React.FC = () => {
  console.log('Rendering ShoppingCart') /* FOR DEBUGGING PURPOSES */

  /* Hooks */
  const navigate = useNavigate()
  const store = useSelector<any, any>((store) => store)
  const { user, purchase } = store

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
    navigate('/payment')
  }

  /* Interface */
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Cart is empty */}
      {purchase.bookPurchases.length === 0 && (
        <div className='flex flex-col items-center p-4'>
          <h1 className='text-2xl text-center font-bold'>
            Your shopping cart is empty
          </h1>
          <p className='mb-8 text-xl text-slate-500'>Try adding some books</p>
          <img className='w-52' src={shoppingCart} alt='' />
        </div>
      )}
      {purchase.bookPurchases.length > 0 && (
        <>
          {/* Book purchases */}
          <div className='mb-[75px]'>
            {purchase.bookPurchases.map((bookPurchase: any) => {
              return (
                <BookTileCart
                  key={bookPurchase.book.isbn13}
                  bookPurchase={bookPurchase}
                />
              )
            })}
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
            <button className='button button-primary' onClick={proceedToPay}>
              Proceed to pay
              <span>
                <MdPayment size={24} />
              </span>
            </button>
          </div>
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
