import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* Entities */
import { User } from './entities/User'
import { ShoppingCartDto } from './dtos/ShoppingCartDto'

/* Redux */
import { login } from './redux/user'
import { load } from './redux/shopping-cart'

/* Pages */
import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Detail } from './pages/Detail'
import { ShoppingCart } from './pages/ShoppingCart'
import { Checkout } from './pages/Checkout'
import { History } from './pages/History'
import { RequireAuth } from './router/RequireAuth'

/* Components */
function App() {
  console.log('Rendering App') /* FOR DEBUGGING PURPOSES */

  /* Hooks */
  const dispatch = useDispatch()

  /* Effects */
  useEffect(() => {
    /* Config user session */
    const rawUser = localStorage.getItem('user')
    if (rawUser) {
      const user = JSON.parse(rawUser) as User
      dispatch(login(user))
    }

    /* Config shopping cart */
    const rawShoppingCart = localStorage.getItem('shoppingCart')
    if (rawShoppingCart) {
      const shoppingCart = JSON.parse(rawShoppingCart) as ShoppingCartDto
      dispatch(load(shoppingCart))
    }
  }, [])

  /* Interface */
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search/:keyword' element={<Search />} />
        <Route path='/book/:isbn13' element={<Detail />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
        <Route
          path='/checkout'
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route
          path='/history'
          element={
            <RequireAuth>
              <History />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
