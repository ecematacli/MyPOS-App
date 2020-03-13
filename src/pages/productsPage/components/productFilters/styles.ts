import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  filterIconContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 'auto',
    marginTop: spacing(3),
    marginBottom: -spacing(1)
  },
  filterIcon: {
    fontSize: spacing(4),
    color: palette.secondary.main
  },
  filterIconDiv: {
    cursor: 'pointer'
  },
  popoverPaper: {
    maxWidth: 435,
    '@media (max-width:465px)': {
      width: 340
    }
  },
  filterCaption: {
    marginTop: spacing(3),
    paddingLeft: spacing(2),
    paddingBottom: spacing(2),
    borderBottom: '1px solid #eee',
    fontSize: spacing(2),
    color: 'rgba(0, 0, 0, 0.54)'
  },
  filterLabel: {
    marginRight: spacing(5),
    '@media (max-width:465px)': {
      marginRight: 0
    },
    color: palette.grayColors[3]
  },
  filterInputContainer: {
    padding: spacing(4, 3, 4)
  },
  filterInputs: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(4),
    '&:last-child': {
      marginBottom: 0
    }
  },
  chipInput: {
    backgroundColor: palette.primary.dark,
    marginLeft: spacing(1),
    marginTop: 10
  },
  input: {
    [breakpoints.down('sm')]: {
      fontSize: spacing(1.6)
    }
  },
  inputRoot: {
    width: 258,
    height: 35,
    borderColor: palette.secondary.dark,
    '&:focus': {
      backgroundColor: 'transparent !important'
    },
    '@media (max-width:465px)': {
      width: 210
    }
  },
  dropdownInput: {
    width: 258,
    '@media (max-width:465px)': {
      width: 210
    }
  },
  innerInput: {
    height: 35
  },
  filterBtnDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: spacing(1.5)
  },
  filterBtn: {
    textTransform: 'capitalize',
    fontSize: spacing(2),
    [breakpoints.down('sm')]: {
      fontSize: 13
    }
  }
}));
