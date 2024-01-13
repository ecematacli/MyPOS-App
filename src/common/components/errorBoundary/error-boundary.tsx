import React, { Component } from 'react'
import { AccordionSummary } from '@mui/material'

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
  ShortErrorInfo,
} from './ErrorBoundaryStyles'

interface Props {
  children: React.ReactNode
  history: any
}
interface State {
  hasError: boolean
  error: any
  errorInfo: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: '', errorInfo: '' }
    // To render the child tree that are error-free
    this.props.history.listen(() => {
      if (this.state.hasError) {
        this.setState({
          hasError: false,
          error: '',
          errorInfo: '',
        })
      }
    })
    this.showMore = this.showMore.bind(this)
  }

  componentDidCatch(error: any, errorInfo: { componentStack: string }) {
    const { componentStack } = errorInfo
    this.setState({
      hasError: true,
      error,
      errorInfo: componentStack,
    })
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
    )
  }

  render(): React.ReactNode {
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
                <AccordionSummary>
                  <ExpansionTextDiv>
                    <ShowMoreText classes={{ body1: 'body' }}>
                      Expand for more info
                    </ShowMoreText>
                  </ExpansionTextDiv>
                </AccordionSummary>
                {this.showMore()}
              </ExpansionPanelContainer>
            </div>
          </ErrorMessageDiv>
        </ErrorBoundaryContainer>
      )
    }

    return this.props.children
  }
}
