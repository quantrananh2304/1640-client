
import loadable from '~/utils/loadable';
import Auth from '~/wrapper/Auth';

const Home = loadable(() => import('~/pages/home'));
const Login = loadable(() => import('~/pages/login'));
const About = loadable(() => import('~/pages/about'));
const Ideas = loadable(() => import('~/pages/ideas/lists'));
const ResetPassword = loadable(() => import('~/pages/resetPassword'));
const Category = loadable(() => import('~/pages/category'));
const Campaign  = loadable(() => import('~/pages/thread'));
const DashBoard = loadable(() => import('~/pages/dashboard'));
const Department = loadable(() => import('~/pages/departments'));
const IdeaDetail = loadable(() => import('~/pages/ideas/[id]'));
const Profile = loadable(() => import('~/pages/profile'));
const Setting = loadable(() => import('~/pages/systemSetting'));
const ResetPasswordCode = loadable(() => import('~/pages/getResetPwCode'));
const Unauthorized = loadable(() => import('~/pages/403'));



export const ROUTES = {

  Home: '/',
  About: '/about',
  Ideas: '/ideas',
  Category: '/category',
  Campaign: '/campaign',
  DashBoard: '/dashboard',
  Department: '/department',
  Profile: '/profile',
  Setting: '/setting',
  IdeaDetail: (id: number | string) => `/ideas/lists/${id}`,
  Unauthorized: '/403',
  // no auth
  Login: '/login',
  ResetPasswordCode: '/get-code',
  ResetPassword: '/resetPassword',
};

const routes = [
  { exact: true, path: ROUTES.Home, component: Home, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.About, component: About, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Ideas, component: Ideas, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.IdeaDetail(':id'), component: IdeaDetail, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Category, component: Category, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Campaign, component: Campaign, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.DashBoard, component: DashBoard, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Department, component: Department, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Profile, component: Profile, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Setting, component: Setting, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Unauthorized, component: Unauthorized, isAuth: true },


  // no auth
  { exact: true, path: ROUTES.Login, component: Login, isAuth: false },
  { exact: true, path: ROUTES.ResetPasswordCode, component: ResetPasswordCode, isAuth: false },
  { exact: true, path: ROUTES.ResetPassword, component: ResetPassword, isAuth: false },
];

export default routes;
