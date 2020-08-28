import React, { Component } from "react";

class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { error: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      errorMsg: error,
    });
  }

  render() {
    const { error, errorMsg } = this.state;
    const { children } = this.props;

    if (error) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {errorMsg && errorMsg.toString()}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
