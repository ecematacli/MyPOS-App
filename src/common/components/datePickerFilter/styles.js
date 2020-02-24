import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing, breakpoints }) => ({
  filterPaper: {
    minWidth: 400,
    height: 220,
    padding: spacing(3, 4),
    overflowY: 'auto',
    [breakpoints.down('sm')]: {
      width: 350,
      height: 285,
      textAlign: 'center'
    }
  },
  datePickerSpan: {
    display: 'inline-block',
    marginTop: spacing(3.5),
    '@media (max-width:420px)': {
      paddingRight: spacing(7)
    }
  },
  datePickerInput: {
    '@media (max-width:420px)': {
      width: '230px !important'
    },
    '@media (max-width:600px) and (min-width: 421px)': {
      width: '280px !important'
    }
  },
  endDate: {
    [breakpoints.up('md')]: {
      marginLeft: 32
    }
  },
  calendarIcon: {
    color: palette.secondary.main
  },
  filterCaption: {
    marginTop: spacing(3),
    paddingLeft: spacing(2),
    paddingBottom: spacing(2),
    borderBottom: '1px solid #eee',
    fontSize: spacing(2),
    color: 'rgba(0, 0, 0, 0.54)'
  },
  filterBtnDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: spacing(6),
    '@media (max-width:420px)': {
      paddingRight: spacing(7),
      marginBottom: -spacing(3)
    }
  },
  filterBtn: {
    textTransform: 'capitalize',
    fontSize: spacing(2)
  }
}));
