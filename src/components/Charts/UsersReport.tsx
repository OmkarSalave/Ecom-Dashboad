/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import UserOption from './options/UserOption';
import { motion } from 'framer-motion';
type Props = {
  userData: any;
};
interface ChartThreeState {
  series: number[];
  mobile: number;
  desktop: number;
  tablet: number;
  other: number;
}

const UsersReport = ({ userData }: Props): JSX.Element => {
  const { pathname } = useLocation();
  const [filter, setFilter] = useState('monthly');
  const [state, setState] = useState<ChartThreeState>({
    series: [],
    mobile: 0,
    tablet: 0,
    desktop: 0,
    other: 0,
  });

  useEffect(() => {
    if (filter === 'yearly') {
      const filteredData = userData?.user_analytics?.yearly?.data;
      setState({
        series: filteredData,
        mobile: userData?.user_analytics?.yearly?.mobile,
        tablet: userData?.user_analytics?.yearly?.tablet,
        desktop: userData?.user_analytics?.yearly?.desktop,
        other: userData?.user_analytics?.yearly?.other,
      });
    } else if (filter === 'monthly') {
      const filteredData = userData?.user_analytics?.monthly?.data;
      setState({
        series: filteredData,
        mobile: userData?.user_analytics?.monthly?.mobile,
        tablet: userData?.user_analytics?.monthly?.tablet,
        desktop: userData?.user_analytics?.monthly?.desktop,
        other: userData?.user_analytics?.monthly?.other,
      });
    }
  }, [userData, filter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      animate={{ x: [300, 0] }}
      transition={{
        ease: 'linear',
        duration: 0.6,
        delay: 0.7,
        times: [0],
      }}
      className={`sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default ${pathname === '/' ? 'lg:col-span-4' : 'sm:col-span-12'} `}
    >
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black">User Analytics</h5>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 ">
            <button
              onClick={() => setFilter('monthly')}
              className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card ${filter == 'monthly' ? 'shadow-card bg-white' : ''}`}
            >
              Month
            </button>

            <button
              onClick={() => setFilter('yearly')}
              className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card ${filter == 'yearly' ? 'shadow-card bg-white' : ''}`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={UserOption()}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#69b1ff]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Desktop </span>
              <span> {state?.desktop ?? 0}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#adc6ff]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Tablet </span>
              <span> {state?.tablet ?? 0}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#d3adf7]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Mobile </span>
              <span> {state?.mobile ?? 0}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#fffb8f]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Other </span>
              <span> {state?.other ?? 0}% </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UsersReport;
