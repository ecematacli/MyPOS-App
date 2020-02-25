import React, { Component } from 'react';

import {
  ErrorBoundaryContainer,
  ErrorIcon,
  ErrorMessageDiv,
  ErrorMessage
} from './ErrorBoundaryStyles';
import history from '../../../history';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '' };
    // To render the child tree that are error-free
    history.listen(() => {
      if (this.state.hasError) {
        this.setState({
          hasError: false,
          error: '',
          errorInfo: ''
        });
      }
    });
  }

  componentDidCatch(error, errorInfo) {
    const { componentStack } = errorInfo;
    this.setState({
      hasError: true,
      error,
      errorInfo: componentStack
    });
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
            {this.state.error && <div>{this.state.error.message}</div>}
            {this.state.errorInfo && <div>{this.state.errorInfo}</div>}
          </ErrorMessageDiv>
        </ErrorBoundaryContainer>
      );
    }

    return this.props.children;
  }
}
