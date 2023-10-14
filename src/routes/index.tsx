import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Charges from "../pages/Charges";
import Sales from "../pages/Sales";
import Dashboard from "../pages/Dashboards";

export const ROUTES = {
  dashboards: "dashboards",
  products: "products",
  charges: "charges",
  sales: "sales",
} as const;

const RouteComponent = () => {
  // TODO: implementar autenticação
  const isAuthenticated = true;

  const router = createBrowserRouter([
    {
      path: "/",
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

  return <RouterProvider router={router}></RouterProvider>;
};

export default RouteComponent;
