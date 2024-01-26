import { styled } from '@mui/material/styles'

import { Props } from './types'

import { Theme, Typography, Box, Button } from '@mui/material'
import { CustomInput } from 'common/components/custom-input/custom-input'

export const ContentContainer = styled(Box)(({ theme }) => (props: Props) => ({
  width: props.field === 'discountPrice' ? 290 : 250,
  height: props.field === 'discountPrice' ? 200 : 190,
  color: theme.palette.secondary.main,
}))

export const PriceCaptionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grayColors[9],
  padding: theme.spacing(2, 2),
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(1.7),
  },
}))

export const AddPriceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}))

export const ButtonContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 1.2, 1.5),
}))

export const StyledCustomInput = styled(CustomInput)({
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
})

export const StyledActionButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  textTransform: 'capitalize',
  marginRight: -8,

  '&:first-child': {
    marginRight: theme.spacing(1),
  },
}))

export const getPriceInputRootStyles = (theme: Theme) => ({
  width: 150,
  height: 35,
  borderColor: theme.palette.secondary.dark,
  '&:focus': {
    backgroundColor: 'transparent !important',
  },
  '@media (max-width:465px)': {
    width: 210,
  },
})

export const getSmallScreenInputStyles = (theme: Theme) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(1.7),
  },
})
