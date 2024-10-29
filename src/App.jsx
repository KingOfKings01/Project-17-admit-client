import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Home from "./Pages/Home"
import Login from "./Pages/login"
import SignUp from "./Pages/SignUp"
import Category from "./Pages/Category"
import Bookings from "./Pages/Bookings"
import Movies from "./Pages/Movies"
import Showtime from "./Pages/Showtime"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index Component={Home} />
            <Route path="movies" Component={Movies} />
            <Route path="category" Component={Category} />
            <Route path="bookings" Component={Bookings} />
            <Route path="showtime" Component={Showtime} />
            <Route path="*" element={<h1>Page not found 404</h1>} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
