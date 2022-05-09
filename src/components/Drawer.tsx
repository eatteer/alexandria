import { MouseEventHandler } from 'react'

/* Component props */
type Props = {
  isOpen: boolean
  closeDrawer: Function
  children: JSX.Element | JSX.Element[]
}

/* Component */
export const Drawer: React.FC<Props> = ({ isOpen, closeDrawer, children }) => {
  /* Handlers */
  const handleCloseDrawer: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      closeDrawer()
    }
  }

  /* Handle on open (visible) styles */
  const isVisible = isOpen ? 'visible opacity-100' : 'invisible opacity-0'
  const isOverlayVisible = isOpen ? 'translate-x-[0%]' : 'translate-x-[-100%]'

  /* Interface */
  return (
    <div
      onClick={handleCloseDrawer}
      className={`
        z-10
        fixed top-0 left-0 bottom-0 right-0
        ${isVisible}
        ease-in duration-300 touch-none
      bg-[#111111bd] backdrop-blur-sm
      `}
    >
      <div
        className={`
          w-72 h-full
          ${isOverlayVisible}
          ease-in-out duration-300 
        bg-white rounded-tr-xl rounded-br-xl
        `}
      >
        {children}
      </div>
    </div>
  )
}
