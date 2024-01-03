import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing }) => ({
  gridItem: {
    paddingTop: 0,
    height: '100vh',
    overflow: 'auto',
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
  countTableDiv: {
    position: 'relative',
    padding: spacing(3.5, 6),
  },
  tableSectionWrapper: {
    margin: '0 auto',
    maxWidth: spacing(137.5),
    display: 'flex',
  },
}))
