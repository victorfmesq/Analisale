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
import useSession from "../context/SessionContext/useSession";
import React, { useEffect } from "react";

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
  const { isAuthenticated } = useSession();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navigate to={`${isAuthenticated ? ROUTES.home : ROUTES.login}`} />
      ),
    },
    {
      path: `${ROUTES.home}`,
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ROUTES.home,
          element: <Home />,
        },
        { path: ROUTES.login, element: <Login /> },

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
    {
      path: `${ROUTES.login}`,
      element: <Login />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ROUTES.home,
          element: <Home />,
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
      ],
    },
    // {
    //   path: `${isAuthenticated ? ROUTES.home : ROUTES.login}`,
    //   element: isAuthenticated ? <Home /> : <Login />,
    //   errorElement: <ErrorPage />,
    //   children: [
    //     {
    //       path: ROUTES.home,
    //       element: <Home />,
    //     },

    //     {
    //       path: ROUTES.products,
    //       element: <Products />,
    //     },
    //     {
    //       path: ROUTES.charges,
    //       element: <Charges />,
    //     },
    //     {
    //       path: ROUTES.sales,
    //       element: <Sales />,
    //     },
    //     {
    //       path: ROUTES.dashboards,
    //       element: <Dashboard />,
    //     },
    //   ],
    // },
  ]);

  return (
    <ModalProvider>
      <RouterProvider router={router}></RouterProvider>
    </ModalProvider>
  );
};

export default RouteComponent;
