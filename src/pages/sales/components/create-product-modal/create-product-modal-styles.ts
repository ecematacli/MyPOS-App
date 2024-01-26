import Accordion from '@mui/material/Accordion'

import { styled } from '@mui/material/styles'

import {
  Theme,
  Typography,
  AccordionDetails,
  DialogTitle,
  Dialog,
} from '@mui/material'

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  '&.MuiAccordion-root': {
    boxShadow: 'none',
    color: theme.palette.secondary.main,
  },
}))

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: 800,
    maxHeight: 'unset',
    marginTop: 10,
    padding: theme.spacing(7),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    borderRadius: 6,
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: 20,
  color: theme.palette.grayColors[3],
  display: 'flex',
  justifyContent: 'center',
}))

export const StyledAccordionDetails = styled(AccordionDetails)({
  '&.MuiAccordionDetails-root': {
    display: 'flex',
    flexDirection: 'column',
  },
})

export const ExpansionText = styled(Typography)({
  textDecoration: 'underline',
  fontWeight: 'bold',
  fontSize: 16,
})

export const getDropdownInputStyles = (theme: Theme) => ({
  width: 380,
  height: 50,
  marginBottom: 15,
  color: theme.palette.secondary.main,
})
