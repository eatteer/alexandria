import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

/* Services */
import { auth } from '../services/users-service'

/* Redux */
import { login } from '../redux/user'

/* Components */
import { Modal } from '../components/Modal'
import { InputField } from '../components/InputField'

/* Configs */
import { toastErrorOptions } from '../components/toast/toast-options'

/* Component props */
type Props = {
  isOpen: boolean
  closeModal: Function
  openSignUpModal: Function
}
/* Component */
export const SignInModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  openSignUpModal,
}) => {
  console.log('Rendering SignIn') /* FOR DEBUGGING PURPOSES */

  /* Hooks */
  const dispatch = useDispatch()

  /* Handlers */
  const handleOpenSignUpModal = (resetForm: any) => {
    openSignUpModal()
    closeModal()
    resetForm()
  }

  /* Formik context */
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
      onSubmit={async (values, helpers) => {
        const { username, password } = values
        try {
          const user = await auth(username, password)
          closeModal()
          helpers.resetForm()
          dispatch(login(user))
        } catch (error: any) {
          console.error(error.cause)
          toast.error(error.message, toastErrorOptions)
        }
      }}
    >
      {/* Interface */}
      {({ resetForm }) => (
        /* Modal */
        <Modal
          isOpen={isOpen}
          closeModal={() => {
            resetForm()
            closeModal()
          }}
        >
          {/* Modal content */}
          <Form>
            <h2 className='mb-2 text-4xl text-center font-bold'>Sign in</h2>
            <h3 className='mb-4 text-lg text-center text-gray-500 '>
              Sign in with your username here
            </h3>
            <div className='space-y-4'>
              <InputField type='text' name='username' placeholder='Username' />
              <InputField
                type='password'
                name='password'
                placeholder='Password'
              />
              <button className='button button-primary w-full' type='submit'>
                Sign in
              </button>
            </div>
            <div className='mt-8 text-center'>
              Don't have an account?{' '}
              <span
                className='cursor-pointer font-medium text-blue-600'
                onClick={() => handleOpenSignUpModal(resetForm)}
              >
                Sign up
              </span>
            </div>
          </Form>
        </Modal>
      )}
    </Formik>
  )
}
