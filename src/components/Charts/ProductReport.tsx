/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ProductOptions from './options/ProductOptions';
import Spinner from '../Spinner';
import { useLocation } from 'react-router-dom';

type Props = {
  productData: any;
};
interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ProductReport = ({ productData }: Props): JSX.Element => {
  const { pathname } = useLocation();
  const [filter, setFilter] = useState('day');
  const [productTotal, setProductTotal] = useState({
    totalPuma: 0,
    totalAdidas: 0,
    totalFogg: 0,
  });
  const [state, setState] = useState<ChartOneState>({
    series: [],
  });

  const handleReducer = (value: any, type: any) => {
    const total = value.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue,
      0,
    );

    return {
      [type]: total,
    };
  };

  useEffect(() => {
    const filteredData = productData?.product_history?.map((item: any) => {
      if (filter === 'day') {
        const total: any = handleReducer(item?.day_filter, item?.name);
        setProductTotal((prev: any) => {
          return {
            totalPuma: total['Puma shoes'] ?? prev.totalPuma,
            totalAdidas: total?.['Adidas shoes'] ?? prev.totalAdidas,
            totalFogg: total?.['Fogg scent'] ?? prev.totalFogg,
          };
        });
        return {
          name: item.name,
          data: item?.day_filter,
        };
      } else if (filter === 'week') {
        const total: any = handleReducer(item?.week_filter, item?.name);
        setProductTotal((prev: any) => {
          return {
            totalPuma: total['Puma shoes'] ?? prev.totalPuma,
            totalAdidas: total?.['Adidas shoes'] ?? prev.totalAdidas,
            totalFogg: total?.['Fogg scent'] ?? prev.totalFogg,
          };
        });
        return {
          name: item.name,
          data: item?.week_filter,
        };
      } else if (filter === 'month') {
        const total: any = handleReducer(item?.month_filter, item?.name);
        setProductTotal((prev: any) => {
          return {
            totalPuma: total['Puma shoes'] ?? prev.totalPuma,
            totalAdidas: total?.['Adidas shoes'] ?? prev.totalAdidas,
            totalFogg: total?.['Fogg scent'] ?? prev.totalFogg,
          };
        });
        return {
          name: item.name,
          data: item?.month_filter,
        };
      }
    });

    setState({ series: filteredData });
  }, [productData, filter]);

  if (!state?.series) {
    return <Spinner />;
  }
  return (
    <motion.div
      animate={pathname == '/product' ? { y: [300, 0] } : { y: [200, 0] }}
      transition={{
        ease: 'linear',
        duration: 0.4,
        delay: pathname == '/product' ? 0 : 0.8,
        times: [0],
      }}
      className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default  sm:px-7.5"
    >
      <div>
        <h5 className="text-xl font-semibold text-black">Product Sale</h5>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Puma shoes</p>
              <p className="text-sm font-medium">
                Total: {productTotal?.totalPuma}
              </p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Adidas shoes</p>
              <p className="text-sm font-medium">
                Total: {productTotal?.totalAdidas}
              </p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#95de64]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#95de64]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#95de64]">Fogg scent</p>
              <p className="text-sm font-medium">
                Total: {productTotal?.totalFogg}
              </p>
            </div>
          </div>
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
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={ProductOptions({ filter })}
            series={state?.series}
            type="area"
            height={500}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductReport;
