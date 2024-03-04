import React, { Fragment, useContext, useEffect } from 'react';
import CardData from '../components/card';
import ChartOne from '../components/Charts/ProductReport';
import ChartThree from '../components/Charts/UsersReport';
import ChartTwo from '../components/Charts/ProfitReport';
import Spinner from '../components/Spinner';
import ErrorBoundry from '../components/error-boundary';
import { MainContext } from '../components/layout/layout';

const Dashboard: React.FC = () => {
  const {
    loading,
    setLoading,
    upperKpis,
    setUpperKpis,
    chartData,
    setChartData,
  } = useContext(MainContext);

  const amontDecimalConverter = (amount: number) => {
    return amount?.toLocaleString('en-IN', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };
  useEffect(() => {
    const getUpperKpis = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://ecom-dashboard-backend-3fh9hm4nn-omkar-salaves-projects.vercel.app/upper-kpis`,
        );
        const data = await response.json();
        setUpperKpis(data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getUpperKpis();
  }, []);

  useEffect(() => {
    const getdashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://ecom-dashboard-backend-3fh9hm4nn-omkar-salaves-projects.vercel.app/dashboard`,
        );
        const data = await response.json();
        setChartData(data?.data ?? {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getdashboardData();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <ErrorBoundry>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardData
            title="Total Users"
            total={amontDecimalConverter(upperKpis?.users?.total)}
            rate={
              Math.trunc(
                Math.random() * Math.floor(upperKpis?.users?.percentage),
              ) + '%'
            }
            levelUp={
              Math.trunc(
                Math.random() * Math.floor(upperKpis?.users?.percentage),
              ) > 3
                ? true
                : false
            }
          >
            <span className="material-icons-outlined text-primary">people</span>
          </CardData>
          <CardData
            title="Total sales"
            total={amontDecimalConverter(upperKpis?.sales?.total)}
            rate={
              Math.trunc(
                Math.random() * Math.floor(upperKpis?.sales?.percentage),
              ) + '%'
            }
            levelUp={
              Math.trunc(
                Math.random() * Math.floor(upperKpis?.sales?.percentage),
              ) > 3
                ? true
                : false
            }
          >
            <span className="material-icons text-primary">
              currency_exchange
            </span>
          </CardData>
          <CardData
            title="Total Profit"
            total={amontDecimalConverter(upperKpis?.profit?.total)}
            rate={
              Math.trunc(
                Math.random() * Math.floor(upperKpis?.profit?.percentage),
              ) + '%'
            }
            levelUp={
              Math.trunc(
                Math.random() * Math.floor(upperKpis?.profit?.percentage),
              ) > 10
                ? true
                : false
            }
          >
            <span className="material-icons-outlined text-primary">
              shopping_cart
            </span>
          </CardData>
          <CardData
            title="Total Product"
            total={amontDecimalConverter(upperKpis?.products?.total)}
            rate={
              Math.trunc(
                Math.random() * Math.floor(upperKpis?.products?.percentage),
              ) + '%'
            }
            levelUp={
              Math.trunc(
                Math.random() * Math.floor(upperKpis?.users?.percentage),
              ) > 15
                ? true
                : false
            }
          >
            <span className="material-icons-outlined text-primary">
              shopping_bag
            </span>
          </CardData>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <ChartTwo profitData={chartData} />
          <ChartThree userData={chartData} />
          <ChartOne productData={chartData} />
        </div>
      </ErrorBoundry>
    </Fragment>
  );
};

export default Dashboard;
