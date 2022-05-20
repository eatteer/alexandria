import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { auth } from '../services/users-service'
import { login } from '../redux/user/action-creators'
import { BottomModal } from '../components/BottomModal'
import { InputField } from '../components/InputField'
import { toastErrorOptions } from '../components/toast/toast-options'

type Props = {
  closeModal: Function
  openSignUpModal: Function
}

export const SignIn: React.FC<Props> = ({ closeModal, openSignUpModal }) => {
  // console.log('Rendering SignIn')

  const dispatch = useDispatch()

  const handleOpenSignUpModal = () => {
    closeModal()
    openSignUpModal()
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={(values) => {
        const errors: any = {}
        if (!values.username) {
          errors.username = 'Required'
        }
        if (!values.password) {
          errors.password = 'Required'
        }
        return errors
      }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values) => {
        const { username, password } = values
        try {
          const user = await auth(username, password)
          closeModal()
          dispatch(login(user))
        } catch (error: any) {
          console.error(error.cause)
          toast.error(error.message, toastErrorOptions)
        }
      }}
    >
      {() => (
        <Form className='p-8'>
          <h2 className='mb-2 text-4xl text-center font-bold'>Sign in</h2>
          <h3 className='mb-4 text-lg text-center text-gray-500 '>
            Sign in with your username here
          </h3>
          <div className='space-y-4'>
            <InputField
              type='text'
              name='username'
              placeholder='Username'
              autoComplete='off'
            />
            <InputField
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='off'
            />
            <button className='button button-primary w-full' type='submit'>
              Sign in
            </button>
          </div>
          <div className='mt-8 text-center'>
            Don't have an account?{' '}
            <span
              className='cursor-pointer font-medium text-blue-600'
              onClick={handleOpenSignUpModal}
            >
              Sign up
            </span>
          </div>
        </Form>
      )}
    </Formik>
  )
}
