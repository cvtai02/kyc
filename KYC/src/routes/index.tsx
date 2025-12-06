import { Route } from "react-router-dom";
import { type ReactNode } from "react";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { appLazy } from "@/pages/shared/systems/appLazy";

// Lazy load all pages
const Login = appLazy(() => import("@/pages/shared/login"));
const Home = appLazy(() => import("@/pages/shared/Home"));
const NotFound = appLazy(() => import("@/pages/shared/systems/NotFound"));
const Layout = appLazy(() => import("@/pages/shared/layout"));
const Profile = appLazy(() => import("@/pages/shared/profile"));
const KYC = appLazy(() => import("@/pages/shared/kyc"));


//ABSOLUTE ROUTES can be used for redirects outside React components
export const ROUTES = {
  base: '/',
  user: '',
  officer: '/officer',
  login: '/login',
  signup: '/signup',
  profile: '/profile',
  kyc: '/kyc',
}

const AppRoutes: ReactNode =
  <Route>
    <Route element={<PrivateRoute />}>
      <Route path={ROUTES.base} element={
        <Layout />
      }>
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={ROUTES.user} index element={<Home />} />
        <Route path={ROUTES.kyc} element={<KYC />} />
      </Route>
    </Route>

    <Route path={ROUTES.login} element={<Login />} />

    <Route path="*" element={<NotFound />} />
  </Route>

export default AppRoutes;
