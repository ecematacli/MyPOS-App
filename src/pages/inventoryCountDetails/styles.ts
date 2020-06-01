import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
  gridItem: {
    paddingTop: 24,
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
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
}));
