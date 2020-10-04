import { makeStyles } from '@material-ui/core/styles';

const centered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default makeStyles(({ spacing, palette }) => ({
  signInPageContainer: {
    width: '100vw',
    height: '100vh',
    background: `linear-gradient(to right, ${palette.grayColors[11]}, ${palette.grayColors[12]})`,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center'
  },
  signInCard: {
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.30)',
    overflow: 'hidden',
    marginTop: spacing(25),
    color: palette.whiteColors[0],
    width: spacing(87.5),
    height: spacing(56.25),
    borderRadius: '3%',
    '@media (max-width:760px) and (min-width: 568px)': {
      width: '70%',
      height: '50%'
    },
    '@media (max-width:567px) and (min-width: 421px)': {
      width: '80%',
      height: '55%'
    },
    '@media (max-width:420px) and (min-width: 409px)': {
      marginTop: spacing(12.5),
      width: '90%',
      height: '75%'
    },
    '@media (max-width:408px)': {
      marginTop: spacing(8),
      width: '73%',
      height: '68%'
    }
  },
  cardContainer: {
    ...centered,
    width: 'auto',
    height: '100%',
    '@media (max-width:760px) and (min-width: 568px)': {
      flexDirection: 'column',
      paddingTop: spacing(5)
    },
    '@media (max-width:567px)': {
      flexDirection: 'column',
      paddingTop: spacing(6)
    }
  },
  cardContent: {
    marginLeft: spacing(2.8),
    '@media (max-width:760px)': {
      marginLeft: spacing(1)
    }
  },
  signInCardImg: {
    height: spacing(31.25),
    width: spacing(35),
    '@media (max-width:760px) and (min-width: 568px)': {
      width: spacing(37)
    },
    '@media (max-width:375px)': {
      width: spacing(20),
      height: spacing(15)
    }
  },
  signInTextDiv: {
    ...centered
  },
  signInText: {
    color: palette.secondary.main,
    fontSize: spacing(2.5),
    marginBottom: spacing(2)
  },
  signInForm: {
    ...centered,
    flexDirection: 'column'
  },
  btnText: {
    fontSize: spacing(2),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    '@media (max-width:567px)': {
      fontSize: spacing(2.2),
      paddingLeft: spacing(2.5)
    }
  }
}));
