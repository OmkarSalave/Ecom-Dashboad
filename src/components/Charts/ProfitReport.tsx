/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactApexChart from 'react-apexcharts';
import { useLocation } from 'react-router-dom';
import ProfitOption from './options/ProfitOption';

type Props = {
  profitData: any;
};
interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ProfitReport = ({ profitData }: Props): JSX.Element => {
  const { pathname } = useLocation();
  const [filter, setFilter] = useState('day');
  const [state, setState] = useState<ChartTwoState>({
    series: [],
  });

  useEffect(() => {
    const filteredData = profitData?.profit_report?.map((item: any) => {
      if (filter === 'day') {
        return {
          name: item.name,
          data: item?.day_filter,
        };
      } else if (filter === 'week') {
        return {
          name: item.name,
          data: item?.week_filter,
        };
      } else if (filter === 'month') {
        return {
          name: item.name,
          data: item?.month_filter,
        };
      }
    });

    setState({ series: filteredData });
  }, [profitData, filter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      animate={{ x: [-300, 0] }}
      transition={{
        ease: 'linear',
        duration: 0.6,
        delay: 0.5,
        times: [0],
      }}
      className={`col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default ${pathname === '/' ? 'lg:col-span-8' : 'sm:col-span-12'}`}
    >
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black ">Profit Report</h4>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 ">
            <button
              onClick={() => setFilter('day')}
              className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card ${filter == 'day' ? 'shadow-card bg-white' : ''}`}
            >
              Day
            </button>
            <button
              onClick={() => setFilter('week')}
              className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card ${filter == 'week' ? 'shadow-card bg-white' : ''}`}
            >
              Week
            </button>
            <button
              onClick={() => setFilter('month')}
              className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card ${filter == 'month' ? 'shadow-card bg-white' : ''}`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={ProfitOption({ filter })}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfitReport;
