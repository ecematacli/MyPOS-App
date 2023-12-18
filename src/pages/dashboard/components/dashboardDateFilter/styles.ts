import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ spacing }) => ({
  inputContainer: {
    marginRight: spacing(2),
  },
  input: {
    width: 245,
  },
  datePickerContainer: {
    display: 'flex',
  },
  dashboardFiltersContainer: {
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
