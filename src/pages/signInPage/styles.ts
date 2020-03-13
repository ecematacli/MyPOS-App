import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  signInPageContainer: {
    width: '100vw',
    height: '100vh',
    background: `linear-gradient(to right, ${palette.grayColors[11]}, ${palette.grayColors[12]})`,
    margin: '-24px'
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
    overflow: 'auto',
    color: palette.whiteColors[0],
    width: 700,
    height: 450,
    '@media (max-width:760px) and (min-width: 568px)': {
      width: '75%',
      height: '85%'
    },
    '@media (max-width:567px)': {
      width: '85%',
      height: '90%',
      marginTop: spacing(12.5)
    },
    borderRadius: '3%'
  },
  cardContainer: {
    width: 'auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width:760px) and (min-width: 568px)': {
      flexDirection: 'column',
      paddingTop: spacing(5)
    },
    '@media (max-width:567px)': {
      flexDirection: 'column',
      paddingTop: spacing(1.5)
    }
  },
  cardContent: {
    marginLeft: spacing(2.5)
  },
  signInCardImg: {
    height: 250,
    width: 280,
    '@media (max-width:567px)': {
      width: 200,
      height: 180
    }
  },
  signInTextDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInText: {
    color: palette.secondary.main,
    fontSize: spacing(2.5),
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
    textTransform: 'capitalize',
    '@media (max-width:567px)': {
      fontSize: 18,
      paddingLeft: spacing(2.5)
    }
  }
}));
