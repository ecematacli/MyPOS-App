import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  inventoryContainer: {
    height: '95vh'
  },
  tabsPaper: {
    width: '100%',
    boxShadow: 'none',
    marginTop: spacing(7),
    backgroundColor: 'inherit'
  },
  tabs: {
    marginLeft: spacing(25)
  },
  tabRoot: {
    textTransform: 'none',
    fontSize: spacing(2)
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
