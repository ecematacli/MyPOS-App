import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  inventoryCountContainer: {
    height: '95vh'
  },
  titleDiv: {
    margin: spacing(7, 29, 1.2),
    display: 'flex',
    alignItems: 'center'
  },
  backArrow: { color: palette.grayColors[13], cursor: 'pointer' },
  iconDiv: { display: 'flex', alignItems: 'center' },
  titleText: {
    fontSize: spacing(3.2),
    marginLeft: spacing(0.4),
    fontWeight: 'bold',
    color: '#3a4953'
  },
  startCountPaper: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: spacing(11.25),
    padding: spacing(3),
    backgroundColor: '#f1f3f5',
    boxShadow: 'none'
  },
  infoText: {
    color: palette.grayColors[3],
    paddingLeft: spacing(20)
  },
  actionBtnDiv: {
    marginRight: spacing(4)
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
  }
}));
