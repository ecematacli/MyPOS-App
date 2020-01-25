import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  productDetailsContainer: {
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    overflow: 'auto',
    marginTop: '-14.8px',
    paddingTop: spacing(3),
    paddingBottom: spacing(4),
    fontSize: 14,
    borderTop: 'transparent',
    color: palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: ({ rowIndex }) =>
      rowIndex % 2 ? `${palette.whiteColors[0]}` : `${palette.greenColors[2]}`,
    position: 'relative'
  },
  detailsCard: {
    width: '75%',
    height: '80%',
    boxShadow: 'none',
    backgroundColor: 'inherit',
    paddingLeft: spacing(2.5),
    paddingRight: spacing(2),
    border: `1px solid ${palette.secondary.light}`,
    marginBottom: 15
  },
  cardHead: {
    borderRadius: 3,
    width: '65%',
    height: 65,
    marginBottom: -spacing(4),
    padding: spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: '3 !important',
    background: ({ rowIndex }) =>
      rowIndex % 2 ? `${palette.grayColors[10]}` : `${palette.greenColors[6]}`
  },
  productDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:first-child': {
      marginTop: 40
    },
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    margin: spacing(1),
    color: palette.secondary.main
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: palette.secondary.dark
  },
  editIcon: {
    marginLeft: spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: palette.secondary.dark,
    cursor: 'pointer'
  },
  detailAction: {
    display: 'flex'
  },
  iconButton: {
    width: 35,
    height: 35,
    padding: 0,
    '& > span': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  detailActionBtnIcon: {
    width: 25,
    height: 25,
    fontSize: spacing(3.5),
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  editFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  editIcons: {
    marginLeft: spacing(1)
  },
  input: {
    width: 246,
    height: 35
  },
  dropdownInput: {
    width: 246
  },
  innerInput: {
    height: 35,
    backgroundColor: 'none'
  }
}));
