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
import ShoppingCard from "./pages/ShoppingCard";
import PersonPage from "./pages/PersonPage";
import WishListPage from "./pages/WishListPage";
import CheckoutPage from "./pages/CheckoutPage";
import ManageOrders from "./pages/ManageOrders";
import SearchByCategoryPage from "./pages/SearchByCategoryPage";
import Orders from "../src/pages/admin/Orders";

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

        {!isLoggedin && (
          <>
            <Route
              path="/sign-in"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <Register />
                </Layout>
              }
            />
          </>
        )}
        <Route
          path="/product/detail/:productId"
          element={
            <Layout>
              <ProductDetailPage />
            </Layout>
          }
        />
        <Route
          path="/search/category/:categoryId"
          element={
            <Layout>
              <SearchByCategoryPage />
            </Layout>
          }
        />
        {isLoggedin && user?.role === "admin" ? (
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
              path="/admin-dashboard/orders"
              element={
                <AdminLayout>
                  <Orders />
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
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        {isLoggedin ? (
          <>
            <Route
              path="/user-profile"
              element={
                <Layout>
                  <PersonPage />
                </Layout>
              }
            />
            <Route
              path="/shopping-card"
              element={
                <Layout>
                  <ShoppingCard />
                </Layout>
              }
            />
            <Route
              path="/wishlist"
              element={
                <Layout>
                  <WishListPage />
                </Layout>
              }
            />
            <Route
              path="/create-order"
              element={
                <Layout>
                  <CheckoutPage />
                </Layout>
              }
            />
            <Route
              path="/manage-orders"
              element={
                <Layout>
                  <ManageOrders />
                </Layout>
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
