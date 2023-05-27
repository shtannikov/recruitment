import {RecruitmentFunnel} from "./components/recruitment-funnel/RecruitmentFunnel";
import {Candidate} from "./components/candidate/Candidate";
import {FunnelStub} from "./components/recruitment-funnel/FunnelStub";

export interface AppRoute {
  element: JSX.Element;
  path?: string;
  index?: boolean;
  requireAuth?: boolean;
}

const AppRoutes : AppRoute[] = [
  {
    index: true,
    element: <FunnelStub />
  },
  {
    path: '/funnel/:id',
    element: <RecruitmentFunnel />
  },
  {
    path: '/candidate/:id',
    element: <Candidate />
  }
];

export default AppRoutes;
