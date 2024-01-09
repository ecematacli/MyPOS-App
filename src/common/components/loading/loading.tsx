import React from 'react'
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'

export const CircularProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 80,
}))

export const Loading = () => (
  <CircularProgressContainer data-testid='loading'>
    <CircularProgress color='primary' />
  </CircularProgressContainer>
)
