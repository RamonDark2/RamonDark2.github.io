import CustomRouter from './components/Router/Router';
import { RouteConfig } from './types/router.types';
import Middlewares from './middleware/index';

// Importar páginas
import SobreMim from './pages/SobreMim';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: SobreMim,
    exact: true,
    middlewares: [
      Middlewares.scrollToTop,
      Middlewares.setMeta({
        title: 'Ramon Rodrigues — Desenvolvedor Full Stack',
        description:
          'Portfólio de Ramon Rodrigues — Desenvolvedor Full Stack. Vue.js, React, Next.js, TypeScript, Node.js, NestJS, Python e PostgreSQL.',
      }),
    ],
  },

  {
    path: '/login',
    component: Login,
    middlewares: [
      Middlewares.guest,
      Middlewares.setMeta({ title: 'Login' }),
    ],
  },
];
 
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
        <CustomRouter
        routes={routes}
        globalMiddlewares={[
          Middlewares.logger,
          Middlewares.analytics,
          Middlewares.errorLogger,
        ]}
        notFoundComponent={NotFound}
        errorComponent={ErrorPage}
      />
    </div>
  );
}

export default App;
