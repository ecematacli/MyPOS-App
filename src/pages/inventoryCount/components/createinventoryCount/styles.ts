import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  createInvContainer: {
    paddingTop: spacing(3)
  },
  titleGrid: {
    width: '50%'
  },
  titleDiv: {
    margin: spacing(7, 0, 1.2),
    display: 'flex'
  },
  backArrow: { color: palette.grayColors[13], cursor: 'pointer' },
  iconDiv: { display: 'flex', alignItems: 'center' },
  titleText: {
    fontSize: spacing(3.2),
    fontWeight: 'bold',
    color: '#3a4953'
  },
  startCountContainer: {
    backgroundColor: '#f1f3f5',
    display: 'flex',
    justifyContent: 'center'
  },
  startCountPaper: {
    height: spacing(11.25),
    padding: spacing(3),
    backgroundColor: 'inherit',
    boxShadow: 'none',
    width: '50%',
    [breakpoints.down('md')]: {
      width: '100%'
    }
  },
  infoText: {
    color: palette.secondary.main,
    paddingRight: spacing(2.3)
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white'
  },
  exitBtn: {
    backgroundColor: palette.grayColors[14],
    marginRight: spacing(1),
    '&:hover': {
      backgroundColor: palette.grayColors[4]
    }
  },
  startBtn: {
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.light
    }
  },
  dividerDiv: {
    padding: spacing(4),
    marginTop: spacing(9),
    '& *': {
      backgroundColor: 'palette.secondary.light'
    }
  },
  filtersGridContainer: {
    width: '50%',
    margin: 'auto'
  },
  imageDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(6.25)
  },
  boxesImage: {
    height: 100
  }
}));
