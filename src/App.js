import { Navigate, useLocation, useMatch } from 'react-router-dom';
import HomeWeb from './Components/home/homeweb.component';
import HomeAdmin from './Components/home/homeadmin.component';
import PageNotFound from './Common/404.common';

function App() {
  const location = useLocation();

  const isWebRoute = useMatch('/home/*');
  const isAdminRoute = useMatch('/admin/*');
  const isDetailRoute = useMatch('/home/product/detail/:id');

  if (location.pathname === '/') {
    return <Navigate to="/home/" />;
  } else if (isWebRoute || isDetailRoute) {
    return <HomeWeb />;
  } else if (isAdminRoute) {
    return <HomeAdmin />;
  } else {
    return <PageNotFound />;
  }
}

export default App;
