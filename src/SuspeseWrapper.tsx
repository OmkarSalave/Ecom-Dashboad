import React, { Suspense } from 'react';
import Spinner from './components/Spinner';

type Props = {
  component: React.JSX.Element;
};

export default function SuspenseWrapper({ component }: Props): JSX.Element {
  function SpinnerComp(): JSX.Element {
    return <Spinner />;
  }

  return <Suspense fallback={<SpinnerComp />}>{component}</Suspense>;
}
