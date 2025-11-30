import { Route } from "react-router-dom";
import { type ReactNode } from "react";
import { PrivateRoute } from "@/routes/PrivateRoute";
import Login from "@/pages/Shared/Login";
import Home from "@/pages/Shared/Home";
import NotFound from "@/pages/system/NotFound";

//ABSOLUTE ROUTES can be used for redirects outside React components
export const ROUTES = {
  login: '/login',
  signup: '/signup',
  home: '/',
}

const AppRoutes: ReactNode = 
  <Route>
    <Route element={<PrivateRoute />}>
      <Route path={ROUTES.home} >
        <Route index element={<Home />} />
      </Route>
    </Route>

    <Route path={ROUTES.login} element={<Login />} />

    <Route path="*" element={<NotFound />} />
  </Route>

export default AppRoutes;
