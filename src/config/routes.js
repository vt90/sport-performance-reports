import Home from '../containers/Home';
import NotFound from '../containers/NotFound';
import FAQ from '../containers/FAQ';
import Reports from '../containers/Reports';
import Reviews from '../containers/Reviews';

const routes = [{
  path: '/',
  component: Home,
}, {
  path: '/feedback',
  component: Reviews,
}, {
  path: '/faq',
  component: FAQ,
}, {
  path: '/reports/:userId',
  component: Reports,
}, {
  path: '*',
  component: NotFound,
}];

export const getAppRoutes = () => routes;
