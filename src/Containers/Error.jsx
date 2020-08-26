import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      errorMsg: error,
    });
    // You can also log error messages to an error reporting service here
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
