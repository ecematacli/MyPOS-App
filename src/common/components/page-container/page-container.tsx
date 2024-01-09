import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  flex: '1 0 auto',
  height: '100%',
  padding: theme.spacing(4),
}))

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <Box height='100%'>
    <StyledContentWrapper className='page-container'>
      {children}
    </StyledContentWrapper>
  </Box>
)
