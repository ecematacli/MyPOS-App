import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  filterIconContainer: {
    height: 32,
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
  popoverPaper: {
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)'
  },
  filterInputContainer: {
    minWidth: 400,
    minHeight: 260,
    padding: spacing(3),
    paddingTop: spacing(5)
  },
  filterInputs: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: spacing(2),
    marginBottom: spacing(4)
  },
  filterLabel: { marginRight: spacing(5), color: palette.grayColors[3] },
  input: {
    width: 246,
    height: 35,
    color: palette.secondary.main,
    borderColor: palette.secondary.dark
  },
  dropdownInput: {
    width: 246
  },
  innerInput: {
    height: 35
  }
}));
