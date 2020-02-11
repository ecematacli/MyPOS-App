import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  signInPageContainer: {
    width: '100vw',
    height: '100vh',
    background: `linear-gradient(to right, ${palette.grayColors[11]}, ${palette.grayColors[12]})`,
    margin: '-25px'
  },
  signInFormContainer: {
    width: '100vw',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInCard: {
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.30)',
    overflow: 'hidden',
    color: palette.whiteColors[0],
    width: 700,
    height: 450,
    borderRadius: '3%'
  },
  cardContainer: {
    width: 'auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContent: {
    marginLeft: 20
  },
  signInCardImg: {
    height: 250,
    width: 280
  },
  signInTextDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInText: {
    color: palette.secondary.main,
    fontSize: 20,
    marginBottom: spacing(2)
  },
  signInForm: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: spacing(2),
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
}));
