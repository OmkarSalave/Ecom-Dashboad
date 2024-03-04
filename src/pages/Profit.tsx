import { useContext, useEffect } from 'react';
import ProfitReport from '../components/Charts/ProfitReport';
import Spinner from '../components/Spinner';
import ErrorBoundry from '../components/error-boundary';
import { MainContext } from '../components/layout/layout';

export default function Profit(): JSX.Element {
  const { loading, setLoading, chartData, setChartData } =
    useContext(MainContext);

  useEffect(() => {
    const getdashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`public/profit.json`);
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
        <ProfitReport profitData={chartData} />
      </div>
    </ErrorBoundry>
  );
}
