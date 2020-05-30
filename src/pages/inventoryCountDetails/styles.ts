import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  gridItem: {
    paddingTop: 24,
  },
  reviewBtnDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 25,
    marginRight: 48,
    marginBottom: -29,
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
  reviewBtn: {
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.light,
    },
  },
}));
