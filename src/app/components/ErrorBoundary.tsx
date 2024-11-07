import { Alert } from 'antd';
import React, { ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert
          message="Error"
          description="This section is not functional. Please refresh the page, or try again later."
          type="error"
          showIcon
        />
      )
    }

    return this.props.children;
  }
}