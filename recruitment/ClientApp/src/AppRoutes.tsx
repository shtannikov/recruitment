import ApiAuthorzationRoutes from './components/authorization/ApiAuthorizationRoutes';
import {RecruitmentFunnel} from "./components/recruitment-funnel/RecruitmentFunnel";
import {Candidate} from "./components/candidate/Candidate";

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
    path: '/candidate/:id',
    element: <Candidate />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
