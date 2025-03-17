import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProductPage from "../pages/ProductsPage/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import CartPage from "../pages/CartPage/CartPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage.jsx";
import CheckoutSuccess from "../pages/CheckoutSuccess/CheckoutSuccess.jsx";
import CheckoutFailure from "../pages/CheckoutFailure/CheckoutFailure.jsx";
import OrderPage from "../pages/OrderPage/OrderPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import ProductCategoryPage from "../pages/ProductCategoryPage/ProductCategoryPage.jsx";

export const routes = [
  { path: '/', page: HomePage, isShowHeader: true, isShowFooter: true },
  { path: '/user/login', page: LoginPage, isShowHeader: true, isShowFooter: true },
  { path: '/user/register', page: RegisterPage, isShowHeader: true, isShowFooter: true },
  { path: '/products', page: ProductPage, isShowHeader: true, isShowFooter: true },
  { path: '/products/detail/:slugProduct', page: ProductDetailPage, isShowHeader: true, isShowFooter: true },
  { path: '/products/:slugCategory', page: ProductCategoryPage, isShowHeader: true, isShowFooter: true },
  { path: '/cart', page: CartPage, isShowHeader: true, isShowFooter: true },
  { path: '/checkout', page: CheckoutPage, isShowHeader: true, isShowFooter: true },
  { path: '/checkout/success', page: CheckoutSuccess, isShowHeader: true, isShowFooter: true },
  { path: '/checkout/failure', page: CheckoutFailure, isShowHeader: true, isShowFooter: true },
  { path: '/order', page: OrderPage, isShowHeader: true, isShowFooter: true },
  { path: '/search', page: SearchPage, isShowHeader: true, isShowFooter: true },
  { path: '*', page: NotFoundPage, isShowHeader: false, isShowFooter: false }
];
