import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing }) => ({
  statsSectionWrapper: {
    margin: '0 auto',
    maxWidth: spacing(137.5),
  },
  field: {
    marginBottom: spacing(0.5),
    '& > span': {
      fontWeight: 600,
    },
  },
}))
