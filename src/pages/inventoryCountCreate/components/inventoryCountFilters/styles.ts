import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  filtersContainer: {
    marginTop: spacing(5.5),
    display: 'flex',
    width: '100%',
  },
  infoText: {
    color: palette.secondary.main,
  },
  calendarIcon: {
    color: palette.secondary.main,
    marginRight: -spacing(1.5),
  },
  datePickerInput: {
    height: spacing(5.75),
    width: spacing(37.5),
  },
  inputSpace: {
    marginLeft: spacing(2.5),
  },
  inputLabel: {
    color: palette.secondary.main,
    fontSize: spacing(1.87),
    fontWeight: 'bold',
  },
  inputContainer: {
    display: 'flex',
    flex: 1,
  },
  filtersInfoDiv: {
    width: spacing(21.25),
    height: spacing(8.37),
    marginRight: spacing(7),
  },
  selectRoot: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  dropdownInputContainer: {
    marginTop: spacing(4),
    display: 'flex',
  },
  dropdownItemDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    [breakpoints.down('sm')]: {
      fontSize: spacing(1.6),
    },
  },
  inputRoot: {
    height: spacing(5.75),
    width: spacing(37.5),
    borderColor: palette.secondary.dark,
    '&:focus': {
      backgroundColor: 'transparent !important',
    },
  },
  dropdownInput: {
    width: spacing(37.5),
  },
  dropdownItems: {
    [breakpoints.down('sm')]: {
      fontSize: spacing(1.75),
    },
  },
  innerInput: {
    height: spacing(5.75),
  },
}))
