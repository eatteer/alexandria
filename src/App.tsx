import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* Entities */
import { User } from './entities/User'
import { Purchase } from './entities/Purchase'

/* Redux */
import { login } from './redux/user'
import { loadPurchase } from './redux/purchase'

/* Components */
import { Navbar } from './components/Navbar'

/* Pages */
import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Detail } from './pages/Detail'
import { ShoppingCart } from './pages/ShoppingCart'
import { Payment } from './pages/Payment'
import { History } from './pages/History'

/* Components */
function App() {
  console.log('Rendering App') /* FOR DEBUGGING PURPOSES */

  /* Hooks */
  const dispatch = useDispatch()

  /* Effects */
  useEffect(() => {
    /* Config user session */
    const _user = localStorage.getItem('user')
    if (_user) {
      const user = JSON.parse(_user) as User
      dispatch(login(user))
    }

    /* Config shopping cart */
    const _purchase = localStorage.getItem('purchase')
    if (_purchase) {
      const purchase = JSON.parse(_purchase) as Purchase
      dispatch(loadPurchase(purchase))
    }
  }, [])

  return (
    /* Interface */
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search/:keyword' element={<Search />} />
        <Route path='/book/:isbn13' element={<Detail />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/history' element={<History />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
