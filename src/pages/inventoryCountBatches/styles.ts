import { makeStyles } from '@material-ui/core/styles';

const centered = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default makeStyles(({ spacing, palette }) => ({
  inventoryContainer: {
    paddingTop: spacing(3),
    height: '100vh',
  },
  titleWrapDiv: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '1100px',
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
    ...centered,
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
  tableDiv: {
    width: '65%',
    margin: 'auto',
  },
  imageDiv: {
    ...centered,
    marginTop: spacing(8),
  },
}));
