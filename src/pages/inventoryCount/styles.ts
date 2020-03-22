import { makeStyles } from '@material-ui/core/styles';

const centered = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  inventoryContainer: {
    paddingTop: spacing(3)
  },
  tabs: {
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
  addCountDiv: {
    ...centered,
    height: spacing(11.25),
    boxShadow: 'none',
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
    ...centered,
    marginTop: spacing(8)
  }
}));
