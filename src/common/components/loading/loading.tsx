import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Loading = () => (
  <Box
    display='flex'
    justifyContent='center'
    mt='80px'
    data-testid='loading-indicator'>
    <CircularProgress color='primary' />
  </Box>
)
