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
const PreviewPage = appLazy(() => import("@/pages/officer/preview"));
const ResultsPage = appLazy(() => import("@/pages/officer/results"));


//ABSOLUTE ROUTES can be used for redirects outside React components
export const ROUTES = {
  base: '/',
  user: '',
  login: '/login',
  signup: '/signup',
  profile: '/profile',
  kyc: '/kyc',
  officer: '/officer',
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
        <Route path={ROUTES.officer} element={<PrivateRoute requiredRoles={['admin', 'moderator']} />}>
          <Route path="preview" element={< PreviewPage/>} />
          <Route path="results" element={< ResultsPage/>} />
        </Route>
      </Route>
    </Route>

    <Route path={ROUTES.login} element={<Login />} />

    <Route path="*" element={<NotFound />} />
  </Route>

export default AppRoutes;
