import { Navigate, useLocation, useMatch } from 'react-router-dom';
import HomeWeb from './Components/home/homeweb.component';
import HomeAdmin from './Components/home/homeadmin.component';
import PageNotFound from './Common/404.common';
import Login from './Components/auth/login.component';
import { useEffect } from 'react';
import ReactGA from "react-ga4";

function App() {

  useEffect(() => {
    document.title = 'Phương Thanh Sport';
  }, []);

  const location = useLocation();

  const isWebRoute = useMatch('/home/*');
  const isLogin = useMatch('/login/*');
  const isAdminRoute = useMatch('/admin/*');
  const isDetailRoute = useMatch('/home/product/detail/:id');

  const isAuthenticated = localStorage.getItem('username') === 'admin' && localStorage.getItem('password') === '123qwe';

  useEffect(() => {
    if (isWebRoute || isLogin) {
      localStorage.clear(); // Clear localStorage when navigating to home
    }
  }, [isWebRoute, isLogin]);

  useEffect(() => {
    ReactGA.initialize("G-C15SXDCYFN");
    ReactGA.send("pageview");
  }, []);


  if (location.pathname === '/') {
    return <Navigate to="/home/" />;
  } else if (isWebRoute || isDetailRoute) {
    return <HomeWeb />;
  } else if (isAdminRoute) {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <HomeAdmin />;
  } else if (location.pathname === '/login') {
    // Render the login page
    return <Login />;
  } else {
    return <PageNotFound />;
  }
}

export default App;