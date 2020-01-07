import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  signInRoot: {
    width: '100vw',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInCard: {
    width: 700,
    height: 450,
    borderRadius: '3%'
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardMedia: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInCardImg: {
    height: 250,
    width: 280
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInFormContainer: {
    marginLeft: spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInForm: {
    display: 'flex',
    flexDirection: 'column',
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
    marginBottom: spacing(3)
  },
  btnText: {
    fontSize: spacing(2),
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
}));
