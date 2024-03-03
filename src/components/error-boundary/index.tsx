import React, { Component, ReactNode } from 'react';

type myProps = {
  children?: ReactNode;
};

type MyState = {
  hasError: boolean;
};

export default class ErrorBoundry extends Component<myProps, MyState> {
  constructor(props: myProps | Readonly<myProps>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): {
    hasError: boolean;
    error: Error;
  } {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render():
    | string
    | number
    | boolean
    | Iterable<React.ReactNode>
    | JSX.Element
    | null
    | undefined {
    if (this.state.hasError) {
      return (
        <div className="w-full container">
          <div className="d-flex justify-content-center items-center">
            <h1 className="text-center text-black text-[10rem]">
              Something went wrong try again later!
            </h1>
            <p className="text-center text-[gray] mt-1 text-[4rem]">
              Please try after some time.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
