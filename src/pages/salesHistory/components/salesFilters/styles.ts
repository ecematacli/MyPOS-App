import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ palette, spacing }) => ({
  filterIconContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 'auto',
    marginTop: spacing(3),
    marginBottom: -spacing(1),
  },
  filterIconDiv: {
    cursor: 'pointer',
  },
  filterIcon: {
    fontSize: spacing(4),
    color: palette.secondary.main,
  },
  dropdownInput: {
    width: 200,
    height: 50,
    marginBottom: 15,
    color: palette.secondary.main,
    marginTop: spacing(3),
  },
  salesFilterContainer: {
    padding: spacing(3.4, 4),
  },
  filterBtnDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: spacing(6),
    '@media (max-width:420px)': {
      paddingRight: spacing(7),
      marginBottom: -spacing(3),
    },
  },
  filterBtn: {
    textTransform: 'capitalize',
    fontSize: spacing(2),
  },
}))
