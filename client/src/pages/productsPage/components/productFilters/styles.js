import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  filterIconContainer: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end',
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
  filterCaption: {
    marginTop: spacing(3),
    paddingLeft: spacing(2),
    paddingBottom: spacing(2),
    borderBottom: '1px solid #eee',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  filterLabel: { marginRight: spacing(5), color: palette.grayColors[3] },
  filterInputContainer: {
    minWidth: 400,
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
  popoverPaper: {
    maxWidth: 435
  },
  chipInput: {
    backgroundColor: palette.primary.dark,
    marginLeft: spacing(1),
    marginTop: 10
  },
  firstChip: {
    marginLeft: 2
  },
  input: {
    width: 258,
    height: 35,
    borderColor: palette.secondary.dark,
    '&:focus': {
      backgroundColor: 'transparent !important'
    }
  },
  dropdownInput: {
    width: 258
  },
  innerInput: {
    height: 35
  },
  filterBtnDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: spacing(2.7),
    marginBottom: spacing(2)
  },
  filterBtn: {
    textTransform: 'capitalize',
    fontSize: 16
  }
}));
