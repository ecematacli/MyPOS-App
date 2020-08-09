import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette, spacing }) => ({
  stockOrdersContainer: {
    paddingTop: 24,
  },
  titleText: {
    fontSize: spacing(3.2),
    fontWeight: 'bold',
    color: '#3a4953',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  instructions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  uploadFileDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    color: palette.secondary.main,
    paddingRight: spacing(2.5),
  },
  uploadBtn: {
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.light,
    },
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
}));
