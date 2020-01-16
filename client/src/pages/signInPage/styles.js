import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  signInPage: {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(to bottom,  #ecf1f1, #f0f3f4, #f0f4f4)',
    margin: '-25px'
  },
  signInRoot: {
    width: '100vw',
    height: '70vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInCard: {
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.30)',
    overflow: 'hidden',
    color: '#fff',
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
    marginBottom: 20,
    '& > fieldset': {
      backgroundColor: palette.secondary.main
    }
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
