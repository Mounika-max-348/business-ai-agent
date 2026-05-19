"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

interface ErrorBoundaryState {
  error?: Error;
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Dashboard widget error:", error, info.componentStack);
  }

  reset = () => {
    this.setState({ error: undefined, hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <div className="dashboard-error-boundary" role="alert">
        <div>
          <h3>{this.props.label ?? "Dashboard widget"} failed to load</h3>
          <p>
            {this.state.error?.message ||
              "This section hit an unexpected error."}
          </p>
        </div>
        <button type="button" onClick={this.reset}>
          Try again
        </button>
      </div>
    );
  }
}
