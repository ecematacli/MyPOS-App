import React, { Component } from 'react';

import {
  ErrorBoundaryContainer,
  ErrorIcon,
  ErrorMessageDiv,
  ErrorMessage
} from './ErrorBoundaryStyles';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  resetState() {
    this.props.resetState();
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryContainer>
          <ErrorIcon />
          <ErrorMessageDiv>
            <ErrorMessage classes={{ body1: 'body' }}>
              Oops! Something went wrong.
            </ErrorMessage>
          </ErrorMessageDiv>
        </ErrorBoundaryContainer>
      );
    }

    return this.props.children;
  }
}
