import { 
  Navigate, 
  Route, 
  BrowserRouter as Router, 
  Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import SearchBar from "./components/SearchBar";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import PaymentCancelled from "./pages/PaymentCancelled";
import { BookingContextProvider } from "./contexts/BookingContext";

const App = () => {

  const {isLoggedIn} = useAppContext()

  return (
    <Router>
      <Routes>

          <Route path="/" element={
            <Layout>
              <SearchBar />
              <Home />
            </Layout>
          } 
          />

          <Route path="/search" element={
            <Layout>
              <SearchBar />
              <Search />
            </Layout>
          } 
          />

          <Route path="/detail/:hotelId" element={
            <Layout>
              <Detail />
            </Layout>
          } 
          />

          <Route path="/register" element={
            <Layout>
              <Register />
            </Layout>
          } 
          />

          <Route path="/sign-in" element={
            <Layout>
              <SignIn />
            </Layout>
          }
          />

        <Route
          path="/add-hotel"
          element={
            isLoggedIn === "success" ? 
            <Layout>
              <AddHotel />
            </Layout> :
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/hotel/:hotelId/booking"
          element={
            isLoggedIn === "success" ? 
            <Layout>
              <BookingContextProvider>
                <Booking />
              </BookingContextProvider>
            </Layout> :
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
        path="/edit-hotel/:hotelId"
        element={
          isLoggedIn === "success" ? 
            <Layout>
              <EditHotel />
            </Layout> :
            <Layout>
              <Home />
            </Layout>
        }
        />

        <Route
        path="/my-hotels"
        element={
          isLoggedIn === "success" ? 
            <Layout>
                <MyHotels />
            </Layout> :
            <Layout>
              <Home />
            </Layout>
        }
        />

        <Route
        path="/my-bookings"
        element={
          isLoggedIn === "success" ? 
            <Layout>
                <MyBookings />
            </Layout> :
            <Layout>
              <Home />
            </Layout>
        }
        />

        <Route path="/payment-success" element={
          <BookingContextProvider>
            <PaymentSuccess />
          </BookingContextProvider>
          } />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/payment-cancelled" element={
          <BookingContextProvider>
            <PaymentCancelled />
          </BookingContextProvider>
          } />

        <Route path="*" element={<Navigate to={"/"} />} />

      </Routes>
    </Router>
  )
}

export default App
