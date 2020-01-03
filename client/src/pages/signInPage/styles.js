import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  signInRoot: {
    position: 'fixed',
    width: '80%',
    height: '70vh',
    minWidth: 350,
    minHeight: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInCard: {
    width: 700,
    height: 450,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardMediaImg: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInCardImg: {
    height: 250,
    width: 280
  },
  signInFormContainer: {
    paddingRight: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInFields: {
    width: 300,
    marginBottom: 20
  },
  signInText: {
    color: palette.secondary.main,
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 20
  },
  btnText: {
    fontSize: spacing(2),
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
}));
