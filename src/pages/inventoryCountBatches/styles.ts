import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  inventoryContainer: {
    paddingTop: spacing(3),
    height: '100vh',
  },
  tabs: {
    boxShadow: 'none',
    backgroundColor: 'inherit',
  },
  tabRoot: {
    textTransform: 'none',
    fontSize: spacing(2),
  },
  addCountDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    boxShadow: 'none',
  },
  infoText: {
    color: palette.secondary.main,
    paddingRight: spacing(2.3),
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
  addBtn: {
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.light,
    },
  },
  tableContainer: {
    position: 'relative',
    padding: spacing(3.5, 6),
  },
  tableSectionWrapper: {
    margin: '0 auto',
    maxWidth: spacing(137.5),
    display: 'flex',
  },
  imageDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing(8),
  },
}));
