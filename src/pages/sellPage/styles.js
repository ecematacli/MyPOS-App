import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  gridContainer: {
    margin: 0
  },
  salesContent: {
    display: 'flex'
  },
  contentRoot: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  productSearchInput: {
    width: '100%',
    color: palette.secondary.main
  },
  control: {
    padding: spacing(2)
  }
}));
