import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing }) => ({
  tableContainer: {
    position: 'relative',
    padding: spacing(3.5, 6),
    marginTop: spacing(2.5),
  },
  tableSectionWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
