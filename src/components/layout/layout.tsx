/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header';

export const MainContext = createContext<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
  upperKpis: any;
  setUpperKpis: (upperKpis: any) => void;
  chartData: any;
  setChartData: (chartData: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  mobileMenuOpen: false,
  setMobileMenuOpen: (mobileMenuOpen: boolean) => mobileMenuOpen,
  upperKpis: {},
  setUpperKpis: (upperKpis: any) => upperKpis,
  chartData: {},
  setChartData: (chartData: any) => chartData,
  loading: false,
  setLoading: (loading: boolean) => loading,
});
const DefaultLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [upperKpis, setUpperKpis] = useState<any>({});
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <MainContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
        upperKpis,
        setUpperKpis,
        chartData,
        setChartData,
        loading,
        setLoading,
      }}
    >
      <div className="">
        <div className="flex h-screen overflow-hidden">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </MainContext.Provider>
  );
};

export default DefaultLayout;
