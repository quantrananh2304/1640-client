
import loadable from '~/utils/loadable';
import Auth from '~/wrapper/Auth';

const Home = loadable(() => import('~/pages/home'));
const Login = loadable(() => import('~/pages/login'));
const About = loadable(() => import('~/pages/about'));
const Ideas = loadable(() => import('~/pages/ideas'));
const Register = loadable(() => import('~/pages/register'));
const Category = loadable(() => import('~/pages/category'));
const DashBoard = loadable(() => import('~/pages/dashboard'));
const Profile = loadable(() => import('~/pages/profile'));

export const ROUTES = {

  Home: '/',
  About: '/about',
  Ideas: '/ideas',
  Category: '/category',
  DashBoard: '/dashboard',
  Profile: '/profile',

  // no auth
  Login: '/login',
  Register: '/register'
};

const routes = [
  { exact: true, path: ROUTES.Home, component: Home, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.About, component: About, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Ideas, component: Ideas, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Category, component: Category, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.DashBoard, component: DashBoard, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.Profile, component: Profile, layout: Auth, isAuth: true },

  // no auth
  { exact: true, path: ROUTES.Login, component: Login, isAuth: false },
  { exact: true, path: ROUTES.Register, component: Register, isAuth: false },
];

export default routes;
