import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing, palette }) => ({
  title: {
    padding: spacing(2, 4),
  },
  content: {
    padding: spacing(2, 4),
    background: palette.secondary.light,
    // width: spacing(80),
  },
  button: {
    marginLeft: spacing(2),
    color: 'white',
  },
}))
