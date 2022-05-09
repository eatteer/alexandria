/* Components */
import { Navbar } from '../components/Navbar'

/* Images */
import book from '../assets/book.png'

/* Component */
export function Home() {
  console.log('Rendering Home') /* FOR DEBUGGING PURPOSES */

  /* Interface */
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Intro */}
      <div className='flex flex-col items-center p-4'>
        {/* Image */}
        <img className='w-52 mb-4' src={book} alt='' />
        {/* Text */}
        <h1 className='mb-4 text-center text-2xl font-bold'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </h1>
        <p className='mb-4 text-justify font-medium text-slate-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis impedit
          atque alias magnam officia quia adipisci magni incidunt rerum vitae
          fugiat blanditiis facere, eaque quod quasi necessitatibus rem eveniet
          dolores?
        </p>
        {/* Button */}
        <button className='button button-dark w-full'>Discover latest</button>
      </div>
    </>
  )
}
