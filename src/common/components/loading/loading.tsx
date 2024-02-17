import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, CircularProgress } from '@mui/material'

export const CircularProgressContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 80,
})

export const Loading = () => (
  <CircularProgressContainer data-testid='loading-indicator'>
    <CircularProgress color='primary' />
  </CircularProgressContainer>
)
