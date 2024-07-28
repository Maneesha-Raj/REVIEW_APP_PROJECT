
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import Indexpage from './pages/Indexpage'
import Productlistpage from './pages/Productlistpage'
import Signuppage from './pages/Signuppage'
import Loginpage from './pages/Loginpage'
import Addreviewpage, { productLoader } from './pages/Addreviewpage'
import Addproductpage from './pages/Addproductpage'
import Userprofilepage from './pages/Userprofilepage'
import Adminhomepage from './pages/Adminhomepage'
import MainLayout from "./Layout/MainLayout"
import AuthLayout from "./Layout/AuthLayout"
import UserReviewsPage from "./pages/UserReviewsPage"



function App() {
  
    const router=createBrowserRouter(
      createRoutesFromElements(
        <>

            <Route path="/" element={<AuthLayout />}>
                  <Route path="/" element={<Indexpage />} /> 
                  <Route path="/login" element={<Loginpage />} />
                  <Route path="/sign-up" element={<Signuppage />} />
                  <Route path="/admin-home" element={<Adminhomepage/>} />
                  <Route path="/add-product" element={<Addproductpage />} />

            </Route>

            <Route path="/" element={<MainLayout />}>
                  <Route path="/" element={<Indexpage />} />
                  <Route path="/sign-up" element={<Signuppage />} />
                  <Route path="/login" element={<Loginpage />} /> 
                  <Route path="/products" element={<Productlistpage />} />
                  <Route path="/all-products" element={<Productlistpage />} />
                  <Route path="/add-product" element={<Addproductpage />} />
                  <Route path="/view-product/:id" element={<Addreviewpage/>} loader={productLoader} />
                  <Route path="/user-home" element={<Userprofilepage/>} />
                  <Route path="/admin-home" element={<Adminhomepage />} />
                  <Route path="/user-home/reviewed-products" element={<UserReviewsPage/>} />
            </Route>
        </>
      )
    )

  return (
    <>
       
          <RouterProvider router={router} />
       
    </>
  )
}

export default App
