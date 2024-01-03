import { makeStyles } from '@mui/styles'

export default makeStyles(({ palette, spacing }) => ({
  stockOrderUploadContainer: {
    paddingTop: 24,
  },
  iconDiv: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: -spacing(0.8),
  },
  backArrow: {
    color: palette.grayColors[13],
    cursor: 'pointer',
  },
  titleText: {
    fontSize: spacing(3.2),
    fontWeight: 'bold',
    color: palette.grayColors[17],
  },
  uploadFileContainer: {
    position: 'relative',
    padding: spacing(3.5, 6),
    marginTop: spacing(2.5),
  },
  uploadFileWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: spacing(137.5),
    margin: '0 auto',
  },
  uploadFeedback: {
    display: 'flex',
    flexDirection: 'column',
    width: '85%',
    paddingRight: spacing(3.75),
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
  validateBtn: {
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.light,
    },
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
}))
