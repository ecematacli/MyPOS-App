import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  inventoryContainer: {
    paddingTop: spacing(3)
  },
  tabsPaper: {
    boxShadow: 'none',
    marginTop: spacing(7),
    backgroundColor: 'inherit'
  },
  tabRoot: {
    textTransform: 'none',
    fontSize: spacing(2)
  },
  addCountContainer: {
    backgroundColor: '#f1f3f5',
    display: 'flex',
    justifyContent: 'center'
  },
  addCountPaper: {
    height: spacing(11.25),
    boxShadow: 'none',
    width: '40%',
    [breakpoints.down('md')]: {
      width: '100%'
    },
    backgroundColor: 'inherit'
  },
  infoText: {
    color: palette.secondary.main,
    paddingRight: spacing(2.3)
  },
  addCountBtnDiv: {
    textTransform: 'capitalize',
    textShadow: 'none'
  },
  addBtn: {
    padding: spacing(1)
  },
  imageDiv: {
    marginTop: spacing(8)
  }
}));
