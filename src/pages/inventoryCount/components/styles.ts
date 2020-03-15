import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  titleDiv: {
    marginTop: spacing(9),
    display: 'flex',
    alignItems: 'center'
  },
  backArrow: { color: palette.grayColors[13], cursor: 'pointer' },
  iconDiv: { display: 'flex', alignItems: 'center' },
  title: {
    fontSize: spacing(3.2),
    marginLeft: spacing(0.4)
  },
  addCountPaper: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: spacing(11.25),
    backgroundColor: '#f1f3f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    boxShadow: 'none'
  },
  infoText: {
    marginLeft: 150,
    color: palette.grayColors[3]
  },
  addCountBtnDiv: {
    textTransform: 'capitalize',
    textShadow: 'none'
  },
  imageDiv: {
    marginTop: spacing(18),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
