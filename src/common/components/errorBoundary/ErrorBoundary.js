import React, { Component } from 'react';
import { ExpansionPanelSummary } from '@material-ui/core';

import {
  ErrorBoundaryContainer,
  ErrorIcon,
  ErrorMessageDiv,
  ErrorMessage,
  ExpansionPanelContainer,
  ExpansionTextDiv,
  ShowMoreText,
  ExpansionPanelContent,
  MoreErrorInfoDiv,
  ShortErrorInfo
} from './ErrorBoundaryStyles';
import history from '../../../history';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '', errorInfo: '' };
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
    this.showMore = this.showMore.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    const { componentStack } = errorInfo;
    this.setState({
      hasError: true,
      error,
      errorInfo: componentStack
    });
  }

  showMore() {
    return (
      <ExpansionPanelContent>
        {this.state.error && (
          <ShortErrorInfo>{this.state.error.message}</ShortErrorInfo>
        )}
        {this.state.errorInfo && (
          <MoreErrorInfoDiv>{this.state.errorInfo}</MoreErrorInfoDiv>
        )}
      </ExpansionPanelContent>
    );
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
            <div>
              <ExpansionPanelContainer classes={{ root: 'root' }}>
                <ExpansionPanelSummary>
                  <ExpansionTextDiv>
                    <ShowMoreText classes={{ body1: 'body' }}>
                      Expand for more info
                    </ShowMoreText>
                  </ExpansionTextDiv>
                </ExpansionPanelSummary>
                {this.showMore()}
              </ExpansionPanelContainer>
            </div>
          </ErrorMessageDiv>
        </ErrorBoundaryContainer>
      );
    }

    return this.props.children;
  }
}
