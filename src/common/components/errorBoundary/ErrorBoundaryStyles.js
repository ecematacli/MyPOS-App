import styled from 'styled-components';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import Typography from '@material-ui/core/Typography';

export const ErrorBoundaryContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 100px;
  height: 50vh;
`;

export const ErrorIcon = styled(SentimentDissatisfiedIcon)`
  width: 100px !important;
  color: #bdbdbd;
  height: 100px !important;
`;

export const ErrorMessageDiv = styled.div`
  margin-top: 8px;
`;
export const ErrorMessage = styled(Typography)`
  color: #3f3f3f;
  &.body {
    font-size: 20px;
  }
`;
