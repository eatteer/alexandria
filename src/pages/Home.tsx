import { Topbar } from '../components/Topbar'
import readingEBook from '../assets/reading-e-book.png'

export function Home() {
  // console.log('Rendering Home')

  return (
    <>
      <Topbar />
      <div className='p-4'>
        <h1 className='mb-8 text-center text-4xl font-bold'>
          Welcome to Alexandria Bookstore
        </h1>
        <img className='w-60 m-auto mb-8' src={readingEBook} alt='Book' />
        <p className='text-center text-slate-600'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur,
          eum perferendis, consectetur ea id inventore nulla nostrum velit
          cumque, ratione repudiandae quia laborum. Sint inventore accusantium,
          odit repellendus cumque consequuntur.
        </p>
      </div>
    </>
  )
}
