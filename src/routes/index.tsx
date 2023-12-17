// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import ErrorPage from "../pages/Error";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Products from "../pages/Products";
// import Charges from "../pages/Charges";
// import Sales from "../pages/Sales";
// import Dashboard from "../pages/Dashboards";
// import { ModalProvider } from "../context/ModalContext";
// import useSession from "../context/SessionContext/useSession";

// export const ROUTES = {
//   dashboards: "dashboards",
//   products: "products",
//   charges: "charges",
//   sales: "sales",
//   home: "home",
//   login: "login",
// } as const;

// const PrivateRoute: React.FC<{
//   path: string;
//   element: React.ReactNode;
// }> = ({ path, element }) => {
//   const { isAuthenticated } = useSession();

//   return isAuthenticated ? (
//     <Route path={path} element={element} />
//   ) : (
//     <Navigate to="/login" replace={true} />
//   );
// };

// const AppRouter: React.FC = () => {
//   return (
//     <ModalProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Navigate to="/home" replace={true} />} />
//           <PrivateRoute path="/home" element={<Home />} />
//           <PrivateRoute path={`/${ROUTES.products}`} element={<Products />} />
//           <PrivateRoute path={`/${ROUTES.charges}`} element={<Charges />} />
//           <PrivateRoute path={`/${ROUTES.sales}`} element={<Sales />} />
//           <PrivateRoute
//             path={`/${ROUTES.dashboards}`}
//             element={<Dashboard />}
//           />
//           <Route path="*" element={<ErrorPage />} />
//         </Routes>
//       </Router>
//     </ModalProvider>
//   );
// };

// export default AppRouter;

import React, { useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

export const ROUTES = {
  dashboards: "dashboards",
  products: "products",
  charges: "charges",
  sales: "sales",
  home: "home",
  login: "login",
} as const;

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useSession();

  const PrivateRoute: React.FC<{ element: React.ReactNode }> = useCallback(
    ({ element }: { element: React.ReactNode }) => {
      console.log("ROUTES", "auth: ", isAuthenticated);

      return isAuthenticated ? (
        <>{element}</>
      ) : (
        <Navigate to="/login" replace={true} />
      );
    },
    [isAuthenticated],
  );

  return (
    <ModalProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated ? "/home" : "/login"}
                replace={true}
              />
            }
          />
          <Route path="/home" element={<PrivateRoute element={<Home />} />}>
            <Route
              path={ROUTES.products}
              element={<PrivateRoute element={<Products />} />}
            />
            <Route
              path={ROUTES.charges}
              element={<PrivateRoute element={<Charges />} />}
            />
            <Route
              path={ROUTES.sales}
              element={<PrivateRoute element={<Sales />} />}
            />
            <Route
              path={ROUTES.dashboards}
              element={<PrivateRoute element={<Dashboard />} />}
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ModalProvider>
  );
};

export default AppRouter;
