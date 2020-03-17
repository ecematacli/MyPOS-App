import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  filtersContainer: {
    marginTop: spacing(18),
    marginLeft: spacing(25),
    display: 'flex',
    flexDirection: 'column'
  },
  calendarIcon: {
    color: palette.secondary.main,
    marginRight: -spacing(1.5)
  },
  datePickerInput: {
    height: spacing(5.75),
    width: spacing(37.5)
  },
  inputSpace: {
    marginLeft: spacing(2.5)
  },
  inputLabel: {
    color: palette.secondary.main,
    fontSize: 15,
    fontWeight: 'bold'
  },
  inputContainer: {
    display: 'flex'
  },
  selectRoot: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  dropdownInputContainer: {
    marginTop: spacing(4),
    display: 'flex'
  },
  dropdownItemDiv: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    [breakpoints.down('sm')]: {
      fontSize: spacing(1.6)
    }
  },
  inputRoot: {
    height: spacing(5.75),
    width: spacing(37.5),
    borderColor: palette.secondary.dark,
    '&:focus': {
      backgroundColor: 'transparent !important'
    }
    // '@media (max-width:465px)': {
    //   width: 210
    // }
  },
  dropdownInput: {
    width: spacing(37.5)
    // '@media (max-width:465px)': {
    //   width: 210
    // }
  },
  dropdownItems: {
    [breakpoints.down('sm')]: {
      fontSize: 14
    }
  },
  innerInput: {
    height: spacing(5.75)
  },
  divider: {
    marginTop: spacing(10),
    backgroundColor: palette.grayColors[10]
  }
}));
