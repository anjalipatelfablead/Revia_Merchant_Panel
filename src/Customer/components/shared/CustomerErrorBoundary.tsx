import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  onNavigateHome?: () => void;
}

interface State {
  hasError: boolean;
  isOffline: boolean;
}

export class CustomerErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    isOffline: !navigator.onLine
  };

  private handleOnline = () => this.setState({ isOffline: false });
  private handleOffline = () => this.setState({ isOffline: true });

  componentDidMount() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true, isOffline: !navigator.onLine };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service, never expose to customer
    console.error('Customer UI Error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.isOffline) {
      return (
        <div className="min-h-screen bg-[#F8F8F6] flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-sm border border-[#E6E6E6] space-y-4">
            <div className="w-16 h-16 bg-[#FFF8ED] rounded-2xl flex items-center justify-center mx-auto text-[#C89B3C]">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#222]">You're Offline</h2>
            <p className="text-sm text-[#666]">Please check your internet connection to view your loyalty status and rewards.</p>
            <button onClick={this.handleRetry} className="w-full py-3 bg-[#222] hover:bg-black text-white rounded-xl font-bold transition-colors">
              Retry Connection
            </button>
          </div>
        </div>
      );
    }

    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F8F6] flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-sm border border-[#E6E6E6] space-y-4">
            <div className="w-16 h-16 bg-[#FFF0F0] rounded-2xl flex items-center justify-center mx-auto text-[#D32F2F]">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#222]">Something went wrong</h2>
            <p className="text-sm text-[#666]">We encountered an unexpected issue while loading this page. Our team has been notified.</p>
            <div className="flex flex-col gap-2 pt-2">
              <button onClick={this.handleRetry} className="w-full flex items-center justify-center gap-2 py-3 bg-[#222] hover:bg-black text-white rounded-xl font-bold transition-colors">
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              {this.props.onNavigateHome && (
                <button onClick={() => { this.setState({ hasError: false }); this.props.onNavigateHome?.(); }} className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-[#E6E6E6] hover:bg-[#F8F8F6] text-[#222] rounded-xl font-bold transition-colors">
                  <Home className="w-4 h-4" /> Return to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
