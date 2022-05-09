import { IoRemove } from 'react-icons/io5'
import { IoAdd } from 'react-icons/io5'

type Props = {
  quantity: number
  increment: Function
  decrement: Function
}

export const QuantitityField: React.FC<Props> = ({
  quantity,
  increment,
  decrement,
}) => {
  const handleIncrement = () => {
    increment()
  }

  const handleDecrement = () => {
    decrement()
  }

  return (
    <div className='flex'>
      <span className='badge-button' onClick={handleDecrement}>
        <IoRemove />
      </span>
      <span className='w-8 text-center'>{quantity}</span>
      <span className='badge-button' onClick={handleIncrement}>
        <IoAdd />
      </span>
    </div>
  )
}
