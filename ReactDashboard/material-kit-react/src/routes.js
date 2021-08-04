import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Sections from 'src/pages/Sections';
import CarList from 'src/pages/CarList';
import Dashboard from 'src/pages/Dashboard';
import NotFound from 'src/pages/NotFound';
import Table from 'src/pages/table'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'sections', element: <Sections /> },
      { path: 'newCars', element: <CarList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'table', element: <Table /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // { path: 'login', element: <Login /> },
      // { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
