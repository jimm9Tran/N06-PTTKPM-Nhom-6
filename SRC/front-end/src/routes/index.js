import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";
import Orderpage from "../pages/OrderPage/Orderpage";
import ProductPage from "../pages/ProductsPage/ProductPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: 'products',
        page: ProductPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: 'order',
        page: Orderpage,
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
