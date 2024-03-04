import { useContext, useEffect } from 'react';
import UsersReport from '../components/Charts/UsersReport';
import Spinner from '../components/Spinner';
import ErrorBoundry from '../components/error-boundary';
import { MainContext } from '../components/layout/layout';

export default function User(): JSX.Element {
  const { loading, setLoading, chartData, setChartData } =
    useContext(MainContext);

  useEffect(() => {
    const getdashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://ecom-dashboard-backend.vercel.app/users`,
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
    <ErrorBoundry>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <UsersReport userData={chartData} />
      </div>
    </ErrorBoundry>
  );
}
