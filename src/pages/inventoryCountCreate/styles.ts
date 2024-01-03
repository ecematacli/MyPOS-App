import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing, palette }) => ({
  createInvContainer: {
    paddingTop: spacing(3),
    height: '100vh',
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
  },
  infoText: {
    color: palette.secondary.main,
    paddingRight: spacing(2.5),
  },
  startCountDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
  exitBtn: {
    backgroundColor: palette.grayColors[14],
    marginRight: spacing(1),
    '&:hover': {
      backgroundColor: palette.grayColors[4],
    },
  },
  startBtn: {
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.light,
    },
  },
  filtersContainer: {
    position: 'relative',
    padding: spacing(3.5, 6),
  },
  filterSectionWrapper: {
    margin: '0 auto',
    maxWidth: spacing(137.5),
    display: 'flex',
  },
  dividerDiv: {
    padding: spacing(4),
    marginTop: spacing(9),
    '& *': {
      backgroundColor: palette.secondary.light,
    },
  },
  imageDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(6.25),
    margin: '0 auto',
    maxWidth: spacing(137.5),
  },
  boxesImage: {
    height: 100,
  },
}))
