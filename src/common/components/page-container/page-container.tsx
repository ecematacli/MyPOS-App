import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  flex: '1 0 auto',
  height: '100%',
  padding: theme.spacing(0, 4),
}))

export const ContentWrapper = styled(Box)(({ theme }) => ({}))

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <StyledContentContainer id='page-container'>
    <ContentWrapper height='100%'>{children}</ContentWrapper>
  </StyledContentContainer>
)
