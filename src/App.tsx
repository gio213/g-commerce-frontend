import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useAppContext } from "./context/AppContext";
import AdminLayout from "./components/admin/layout/AdminLayout";
import AddProduct from "./pages/admin/AddProduct";
import AdminProducts from "./pages/admin/AdminProducts";
import ProductDetailPage from "./pages/ProductDetailPage";
function App() {
  const { isLoggedin, user } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        {/* <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      /> */}
        {/* <Route
        path="/detail/:hotelId"
        element={
          <Layout>
            <Detail />
          </Layout>
        }
      /> */}
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        {/* <Route
        path="/password-reset"
        element={
          <Layout>
            <PasswordReset />
          </Layout>
        }
      /> */}
        <Route
          path="sign-in"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        {isLoggedin && user?.role === "admin" && (
          <>
            <Route
              path="/admin-dashboard"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
            <Route
              path="/admin-dashboard/add-product"
              element={
                <AdminLayout>
                  <AddProduct />
                </AdminLayout>
              }
            />
            <Route
              path="/admin-dashboard/products"
              element={
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              }
            />
          </>
        )}
        {isLoggedin && (
          <>
            {/* <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          /> */}
            {/* <Route
            path="/my-bookings"
            element={
              <Layout>
                <MyBookings />
              </Layout>
            }
          /> */}
            {/* <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          /> */}
            <Route
              path="/product/detail/:productId"
              element={
                <Layout>
                  <ProductDetailPage />
                </Layout>
              }
            />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
