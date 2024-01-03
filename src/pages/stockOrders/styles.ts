import { makeStyles } from '@mui/styles'

export default makeStyles(({ palette, spacing }) => ({
  stockOrdersContainer: {
    paddingTop: 24,
  },
  titleText: {
    fontSize: spacing(3.2),
    fontWeight: 'bold',
    color: palette.grayColors[17],
  },
  uploadFileDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    color: palette.secondary.main,
    paddingRight: spacing(2.5),
  },
  uploadBtn: {
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.light,
    },
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
  tableContainer: {
    position: 'relative',
    padding: spacing(3.5, 6),
    marginTop: spacing(2.5),
  },
  tableSectionWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: spacing(137.5),
    margin: '0 auto',
  },
}))
