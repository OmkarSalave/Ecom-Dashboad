import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import DefaultLayout from './components/layout/layout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Product = lazy(() => import('./pages/Product'));
const Profit = lazy(() => import('./pages/Profit'));
const User = lazy(() => import('./pages/User'));
const SuspenseWrapper = lazy(() => import('./SuspeseWrapper'));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<SuspenseWrapper component={<DefaultLayout />} />}
      >
        <Route path="/" index element={<Dashboard />} />
        <Route
          path="/product"
          element={<SuspenseWrapper component={<Product />} />}
        />
        <Route
          path="/profit"
          element={<SuspenseWrapper component={<Profit />} />}
        />
        <Route
          path="/user"
          element={<SuspenseWrapper component={<User />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
