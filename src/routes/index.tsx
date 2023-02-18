
import loadable from '~/utils/loadable';
import Auth from '~/wrapper/Auth';

const Home = loadable(() => import('~/pages/home'));
const Login = loadable(() => import('~/pages/login'));
const About = loadable(() => import('~/pages/about'));
const Register = loadable(() => import('~/pages/register'));

export const ROUTES = {

  Home: '/',
  About: '/about',

  // no auth
  Login: '/login',
  Register: '/register'
};

const routes = [
  { exact: true, path: ROUTES.Home, component: Home, layout: Auth, isAuth: true },
  { exact: true, path: ROUTES.About, component: About, layout: Auth, isAuth: true },

  // no auth
  { exact: true, path: ROUTES.Login, component: Login, isAuth: false },
  { exact: true, path: ROUTES.Register, component: Register, isAuth: false },
];

export default routes;
