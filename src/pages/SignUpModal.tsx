import React from 'react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import {
  determineExistenceByEmail,
  determineExistenceByUsername,
  register,
} from '../services/users-service'
import { Modal } from '../components/Modal'
import { InputField } from '../components/InputField'
import {
  toastErrorOptions,
  toastSuccessOptions,
} from '../components/toast/toast-options'
type Props = {
  isOpen: boolean
  closeModal: Function
  openSignInModal: Function
}

export const SignUpModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  openSignInModal,
}) => {
  console.log('Rendering SignUp')

  const onClickOpenSignIn = (resetForm: Function) => {
    closeModal()
    resetForm()
    openSignInModal()
  }

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={async ({ username, email, password }) => {
        let errors: any = {}
        if (!username) {
          errors.username = 'Required'
        }
        if (username) {
          try {
            const user = await determineExistenceByUsername(username)
            if (user) {
              errors.username = 'Username already exists'
            }
          } catch (error: any) {
            console.error(error.cause)
          }
        }
        if (!email) {
          errors.email = 'Required'
        }
        if (email) {
          try {
            const user = await determineExistenceByEmail(email)
            if (user) {
              errors.email = 'Email already exists'
            }
          } catch (error: any) {
            console.error(error.cause)
          }
        }
        if (!password) {
          errors.password = 'Required'
        }
        return errors
      }}
      onSubmit={async (values, helpers) => {
        const { username, email, password } = values
        try {
          await register(username, email, password)
          toast.success('User created sucessfully', toastSuccessOptions)
          closeModal()
          helpers.resetForm()
          openSignInModal()
        } catch (error: any) {
          console.error(error)
          toast.error(error.message, toastErrorOptions)
        }
      }}
    >
      {({ resetForm }) => (
        <Modal
          isOpen={isOpen}
          closeModal={() => {
            closeModal()
            resetForm()
          }}
        >
          <Form>
            <h2 className='mb-2 text-4xl text-center font-bold'>Sign up</h2>
            <h3 className='mb-4 text-lg text-gray-500 text-center'>
              Create a free account
            </h3>
            <div className='space-y-4'>
              <InputField type='text' name='username' placeholder='Username' />
              <InputField type='email' name='email' placeholder='Email' />
              <InputField
                type='password'
                name='password'
                placeholder='Password'
              />
              <button className='button button-primary w-full' type='submit'>
                Create your free account
              </button>
            </div>
            <div className='mt-8 text-center'>
              Already have an account?{' '}
              <span
                className='cursor-pointer font-medium text-blue-600'
                onClick={() => onClickOpenSignIn(resetForm)}
              >
                Sign in
              </span>
            </div>
          </Form>
        </Modal>
      )}
    </Formik>
  )
}
