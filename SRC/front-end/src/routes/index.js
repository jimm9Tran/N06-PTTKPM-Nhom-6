import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductsPage/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";

export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/products',
    page: ProductPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/products/detail/:slugProduct',
    page: ProductDetailPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '/order',
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: '*',
    page: NotFoundPage,
    isShowHeader: false,
    isShowFooter: false,
  }
];
