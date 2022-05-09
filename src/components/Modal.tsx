import { MouseEventHandler } from 'react'

/* Icons */
import { GrFormClose } from 'react-icons/gr'

/* Component props */
type Props = {
  isOpen: boolean
  closeModal: Function
  children: JSX.Element | JSX.Element[]
}

/* Components */
export const Modal: React.FC<Props> = ({ isOpen, closeModal, children }) => {
  /* Handlers */
  const handleCloseModalOutside: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  const handleCloseModal = () => {
    closeModal()
  }

  /* Handle on open (visible) styles */
  const isVisible = isOpen ? 'visible opacity-100' : 'invisible opacity-0'
  const isOverlayVisible = isOpen ? 'translate-y-[0%]' : 'translate-y-[100%]'

  /* Interface */
  return (
    /* Background */
    <div
      className={`
        z-20
        fixed top-0 left-0 bottom-0 right-0
        flex justify-center items-center
        ${isVisible}
        ease-in duration-300
        touch-none
        bg-[#111111bd] backdrop-blur-sm
      `}
      onClick={handleCloseModalOutside}
    >
      {/* Container */}
      <div
        className={`
          absolute bottom-0
          w-full
          ${isOverlayVisible}
          ease-in-out duration-300 
        `}
      >
        {/* Header */}
        <div
          className='
            flex
            p-2
            rounded-tl-xl rounded-tr-xl
            bg-white border-b border-b-gray-300
          '
        >
          <GrFormClose
            className='cursor-pointer'
            size={24}
            onClick={handleCloseModal}
          />
        </div>
        {/* Content */}
        <div className='p-8 bg-white'>{children}</div>
      </div>
    </div>
  )
}