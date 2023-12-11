import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ breakpoints }) => ({
  searchBarInput: {
    width: '95%',
    '@media (max-width:1499px) and (min-width:1390px)': {
      width: '85%',
    },
    [breakpoints.down('md')]: {
      width: '100%',
    },
    [breakpoints.only('lg')]: {
      width: '85%',
    },
  },
}))
