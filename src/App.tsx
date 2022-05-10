import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { User } from './entities/User'
import { ShoppingCartDto } from './dtos/ShoppingCartDto'
import { login } from './redux/user'
import { load } from './redux/shopping-cart'
import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { BookDetail } from './pages/BookDetail'
import { ShoppingCart } from './pages/ShoppingCart'
import { Checkout } from './pages/Checkout'
import { History } from './pages/History'
import { RequireAuth } from './router/RequireAuth'
import { HistoryDetail } from './pages/HistoryDetail'

function App() {
  console.log('Rendering App')

  const dispatch = useDispatch()

  useEffect(() => {
    const rawUser = localStorage.getItem('user')
    if (rawUser) {
      const user = JSON.parse(rawUser) as User
      dispatch(login(user))
    }

    const rawShoppingCart = localStorage.getItem('shoppingCart')
    if (rawShoppingCart) {
      const shoppingCart = JSON.parse(rawShoppingCart) as ShoppingCartDto
      dispatch(load(shoppingCart))
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search/:keyword' element={<Search />} />
        <Route path='/book/:isbn13' element={<BookDetail />} />
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
        <Route
          path='/history/detail'
          element={
            <RequireAuth>
              <HistoryDetail />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
