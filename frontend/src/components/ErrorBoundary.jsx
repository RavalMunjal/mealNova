import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 px-4 text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Oops! Something went wrong.</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            We spilled the curry! Our team has been notified. Please try refreshing the page or head back home.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition shadow-lg"
            >
              Refresh Page
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 bg-white text-orange-600 font-bold border-2 border-orange-200 rounded-full hover:bg-orange-50 transition shadow-sm"
            >
              Go to Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
