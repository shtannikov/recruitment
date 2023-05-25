import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import {RecruitmentFunnel} from "./components/RecruitmentFunnel";

export interface AppRoute {
  element: JSX.Element;
  path?: string;
  index?: boolean;
  requireAuth?: boolean;
}

const AppRoutes : AppRoute[] = [
  {
    index: true,
    element: <RecruitmentFunnel />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
