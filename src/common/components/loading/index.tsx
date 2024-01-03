import React from 'react'

import { CircularProgressContainer } from './LoadingStyles'
import CircularProgress from '@mui/material/CircularProgress'

const Loading = () => (
  <CircularProgressContainer data-testid='loading'>
    <CircularProgress color='primary' />
  </CircularProgressContainer>
)

export default Loading
