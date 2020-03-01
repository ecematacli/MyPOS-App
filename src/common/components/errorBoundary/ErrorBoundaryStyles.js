import styled from 'styled-components';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

export const ErrorBoundaryContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 100px;
  height: 80vh;
`;

export const ErrorIcon = styled(SentimentDissatisfiedIcon)`
  width: 100px !important;
  color: #bdbdbd;
  height: 100px !important;
`;

export const ErrorMessageDiv = styled.div`
  margin-top: 8px;
  text-align: center;
`;
export const ErrorMessage = styled(Typography)`
  color: #3f3f3f;
  &.body {
    font-size: 20px;
  }
`;

export const ExpansionPanelContainer = styled(ExpansionPanel)`
  margin-top: 20px;
  &.root {
    box-shadow: none;
    background-color: inherit;
    text-align: center;
  }
`;
export const ExpansionTextDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ShowMoreText = styled(Typography)`
  color: #696969;
  &.body {
    font-size: 18;
    font-weight: bold;
    text-decoration: underline;
  }
`;

export const ExpansionPanelContent = styled(ExpansionPanelDetails)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-size: 18 !important;
`;

export const ShortErrorInfo = styled.div`
  color: #ef5350;
  font-weight: bold;
`;
export const MoreErrorInfoDiv = styled.div`
  width: 300px;
  margin-top: 10px;
`;
