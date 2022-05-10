import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik'
import { logout } from '../redux/user'
import useDrawer from '../hooks/useDrawer'
import useModal from '../hooks/useModal'
import { InputField } from './InputField'
import { Drawer } from './Drawer'
import { SignInModal } from '../pages/SignInModal'
import { SignUpModal } from '../pages/SignUpModal'
import { IoCartOutline, IoHomeOutline } from 'react-icons/io5'
import { IoBagHandleOutline } from 'react-icons/io5'
import { IoMdBook } from 'react-icons/io'
import { IoMdLogIn } from 'react-icons/io'
import { IoMdLogOut } from 'react-icons/io'
import { GrMenu } from 'react-icons/gr'

export const Topbar: React.FC = () => {
  console.log('Rendering MainBar')

  const navigationDelay = 350

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isOpen, openDrawer, closeDrawer } = useDrawer()
  const user = useSelector<any, any>((store) => store.user)
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

  const handleLogout = () => {
    dispatch(logout())
  }

  const navigateToShoppingCart = () => {
    closeDrawer()
    setTimeout(() => {
      navigate('/shopping-cart')
    }, navigationDelay)
  }

  const navigateToHome = () => {
    closeDrawer()
    setTimeout(() => {
      navigate('/')
    }, navigationDelay)
  }

  const navigateToHistory = () => {
    closeDrawer()
    setTimeout(() => {
      navigate('/history')
    }, navigationDelay)
  }

  return (
    <>
      <nav className='top-bar'>
        <GrMenu
          className='cursor-pointer mr-4'
          size={24}
          onClick={openDrawer}
        />
        <Formik
          initialValues={{ keyword: '' }}
          onSubmit={(values) => {
            navigate(`/search/${values.keyword}`)
          }}
        >
          {() => (
            <Form className='w-full'>
              <InputField
                name='keyword'
                type='text'
                placeholder='Search a book'
              />
            </Form>
          )}
        </Formik>
      </nav>
      <Drawer isOpen={isOpen} closeDrawer={closeDrawer}>
        {user ? (
          <div>
            <span className='tile text-2xl font-medium'>{user.username}</span>
            <div className='tile' onClick={navigateToHome}>
              <span>
                <IoHomeOutline size={24} />
              </span>
              Home
            </div>
            <div className='tile' onClick={navigateToShoppingCart}>
              <span>
                <IoCartOutline size={24} />
              </span>
              Shopping cart
            </div>
            <div className='tile' onClick={navigateToHistory}>
              <span>
                <IoBagHandleOutline size={24} />
              </span>
              History purchase
            </div>
            <div className='tile' onClick={handleLogout}>
              <span>
                <IoMdLogOut size={24} />
              </span>
              Log out
            </div>
          </div>
        ) : (
          <div>
            <div className='tile' onClick={navigateToHome}>
              <span>
                <IoHomeOutline size={24} />
              </span>
              Home
            </div>
            <div className='tile' onClick={openSignInModal}>
              <span>
                <IoMdLogIn size={24} />
              </span>
              Sign in
            </div>
            <div className='tile' onClick={openSignUpModal}>
              <span>
                <IoMdBook size={24} />
              </span>
              Sign up
            </div>
            <div className='tile' onClick={navigateToShoppingCart}>
              <span>
                <IoCartOutline size={24} />
              </span>
              Shopping cart
            </div>
          </div>
        )}
      </Drawer>
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
