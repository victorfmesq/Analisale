import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Charges from "../pages/Charges";
import Sales from "../pages/Sales";
import Dashboard from "../pages/Dashboards";
import { ModalProvider } from "../context/ModalContext";

export const ROUTES = {
  dashboards: "dashboards",
  products: "products",
  charges: "charges",
  sales: "sales",
  home: "home",
  login: "login",
} as const;

const RouteComponent = () => {
  // TODO: implementar autenticação
  const isAuthenticated = true;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navigate to={`${isAuthenticated ? ROUTES.home : ROUTES.login}`} />
      ),
    },
    {
      path: `${isAuthenticated ? ROUTES.home : ROUTES.login}`,
      element: isAuthenticated ? <Home /> : <Login />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ROUTES.products,
          element: <Products />,
        },
        {
          path: ROUTES.charges,
          element: <Charges />,
        },
        {
          path: ROUTES.sales,
          element: <Sales />,
        },
        {
          path: ROUTES.dashboards,
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return (
    <ModalProvider>
      <RouterProvider router={router}></RouterProvider>
    </ModalProvider>
  );
};

export default RouteComponent;
