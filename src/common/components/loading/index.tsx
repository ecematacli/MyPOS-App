import React from 'react';

import { CircularProgressContainer } from './LoadingStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading: React.FC = () => (
  <CircularProgressContainer data-testid="loading">
    <CircularProgress color="primary" />
  </CircularProgressContainer>
);

export default Loading;
