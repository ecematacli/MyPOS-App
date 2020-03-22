import { makeStyles } from '@material-ui/core/styles';

const centered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default makeStyles(({ spacing, palette }) => ({
  createInvContainer: {
    paddingTop: spacing(3)
  },
  titleDiv: {
    margin: spacing(7, 0, 1.2),
    display: 'flex',
    justifyContent: 'center'
  },
  backArrow: { color: palette.grayColors[13], cursor: 'pointer' },
  iconDiv: { display: 'flex', alignItems: 'center' },
  titleText: {
    fontSize: spacing(3.2),
    fontWeight: 'bold',
    color: '#3a4953'
  },
  infoText: {
    color: palette.secondary.main,
    paddingRight: spacing(2.5)
  },
  startCountContainer: {
    ...centered,
    backgroundColor: '#f1f3f5',
    height: spacing(11.25),
    width: '100%'
  },
  startCountDiv: {
    ...centered,
    width: 'auto'
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
  imageDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(6.25)
  },
  boxesImage: {
    height: 100
  }
}));
